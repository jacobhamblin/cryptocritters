import { useState } from "react";
import Web3 from "web3";
import useInterval from "../utils/useInterval";

const CONTRACT_ADDRESS = "";
const contractABI = "";

const Controls = ({ setCritters, setContract: setContractParent }) => {
  const [accountID, setAccountID] = useState("");
  const [status, setStatus] = useState("");
  const [web3, setWeb3] = useState(null);
  const [contract, setLocalContract] = useState(null);

  const setContract = (contract) => {
    setLocalContract(contract);
    setContractParent(contract);
  };

  const getCrittersByOwner = (accountID) =>
    contract.methods.getCrittersByOwner(accountID).call();

  useInterval(() => {
    if (!web3) return;
    console.log(web3.eth);
    if (web3.eth.accounts[0] !== accountID) {
      setAccountID(web3.eth.accounts[0]);
      setCritters(getCrittersByOwner(web3.eth.accounts[0]));
    }
  }, 100);

  const generateCritter = () => {
    setStatus("Creating a new Critter. This may take a bit.");
    const name = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 5);
    contract.methods
      .createRandomCritter(name)
      .send({ from: accountID })
      .on("receipt", (receipt) => {
        setStatus(`Successfully created ${name}!`);
      });
  };

  const handleAccountClick = () => {
    if (accountID) {
      console.log("connected");
      return;
    }

    const web3 = new Web3(Web3.currentProvider);
    setWeb3(web3);

    const contract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);
    setContract(contract);
  };

  const accountText = accountID ? accountID : "Connect Metamask";
  return (
    <div>
      <div className="transactionStatus">{status}</div>
      <button
        className="generateCritter"
        disabled={!accountID}
        onClick={generateCritter}
      >
        Get New Critter
      </button>
      <button className="accountButton" onClick={handleAccountClick}>
        {accountText}
      </button>
    </div>
  );
};

export default Controls;
