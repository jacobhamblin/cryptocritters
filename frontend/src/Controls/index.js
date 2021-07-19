import { useState, useEffect } from "react";
import classNames from "classnames";
import Web3 from "web3";
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
    } else if (!accountID) {
      setStatus("Connect metamask to get started!");
    }
  }, []);

  const getCrittersByOwner = (accountID) =>
    contract.methods.getCrittersByOwner(accountID).call();

  useEffect(() => {
    if (!web3 || !contract || !accountID) return;

    async function fetchCritters() {
      const critters = await getCrittersByOwner(accountID);
      console.log("critterss after fetch");
      console.log(critters);
      setCritters(critters);
    }

    fetchCritters();
  }, [contract, web3, accountID]);

  const setContract = (contract) => {
    setLocalContract(contract);
    setContractParent(contract);
  };

  const generateCritter = () => {
    setStatus("Confirm metamask transaction to create Critter.");
    const name = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 5);
    contract.methods
      .createRandomCritter(name)
      .send({ from: accountID })
      .on("receipt", (receipt) => {
        console.log("receipt", receipt);
        setStatus(`Successfully created a Critter!`);
      });
  };

  const handleAccountClick = async () => {
    if (accountID) return;
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccountID(accounts[0]);
    setStatus("");

    const web3 = new Web3(window.ethereum);
    setWeb3(web3);

    const contract = new web3.eth.Contract(
      contractABIJSON.abi,
      CONTRACT_ADDRESS
    );
    setContract(contract);
  };

  const newCritterButtonDisabled = !accountID || !contract;

  const accountText = accountID
    ? accountID.substring(0, 10) + "…"
    : "Connect Metamask";
  return (
    <div className="Controls">
      <span className="transactionStatus nes-text">{status}</span>
      <div className="buttons">
        <button
          className={classNames({
            generateCritter: true,
            "nes-btn": true,
            "is-disabled": newCritterButtonDisabled,
            "is-primary": accountID,
          })}
          disabled={newCritterButtonDisabled}
          onClick={generateCritter}
        >
          Get New Critter
        </button>
        <button
          className={classNames({
            accountButton: true,
            "nes-btn": true,
            "is-primary": !accountID && !!window.ethereum,
            "is-success": !!accountID,
            "is-disabled": !window.ethereum,
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
