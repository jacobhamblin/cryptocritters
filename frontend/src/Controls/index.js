import { useState, useEffect } from "react";
import classNames from "classnames";
import Web3 from "web3";
import useInterval from "../utils/useInterval";
import contractABIJSON from "../abi/CritterOwnershipUpdated.json";
import "./style.css";

const CONTRACT_ADDRESS = "0x51EF4dC2D7bBdb69031563B52cE26Ee28Bff84E7";

const Controls = ({ setCritters, setContract: setContractParent }) => {
  const [accountID, setAccountID] = useState("");
  const [status, setStatus] = useState("");
  const [web3, setWeb3] = useState(null);
  const [contract, setLocalContract] = useState(null);

  useEffect(() => {
    if (!window.ethereum) {
      setStatus("Please install metamask extension and reload page!");
    } else {
      setStatus("Metamask present, ready for blockchain transactions!");
    }
  }, []);

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
    window.ethereum.request({ method: "eth_requestAccounts" });

    const web3 = new Web3(Web3.currentProvider);
    setWeb3(web3);

    const contract = new web3.eth.Contract(
      contractABIJSON.abi,
      CONTRACT_ADDRESS
    );
    setContract(contract);
  };

  const accountText = accountID ? accountID : "Connect Metamask";
  return (
    <div className="Controls">
      <span className="transactionStatus nes-text">{status}</span>
      <div className="buttons">
        <button
          className={classNames({
            generateCritter: true,
            "nes-btn": true,
            "is-disabled": !accountID,
            "is-primary": accountID,
          })}
          disabled={!accountID}
          onClick={generateCritter}
        >
          Get New Critter
        </button>
        <button
          className={classNames({
            accountButton: true,
            "nes-btn": true,
            "is-primary": !contract,
            "is-success": !!accountID,
          })}
          onClick={handleAccountClick}
        >
          {accountText}
        </button>
      </div>
    </div>
  );
};

export default Controls;
