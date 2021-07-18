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
      setStatus("Connect metamask to get started!");
    }
  }, []);

  useEffect(() => {
    if (!web3 || !contract) return;
    setCritters(getCrittersByOwner(web3.eth.accounts[0]));
  }, [contract, web3]);

  const setContract = (contract) => {
    setLocalContract(contract);
    setContractParent(contract);
  };

  const getCrittersByOwner = (accountID) =>
    contract.methods.getCrittersByOwner(accountID).call();

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

  const handleAccountClick = async () => {
    if (accountID) {
      console.log("connected");
      return;
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccountID(accounts[0]);
    console.log(accounts);
    setStatus("");

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
            "is-disabled": !accountID || !contract,
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
