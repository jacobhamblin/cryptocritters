import { useState } from "react";
import CritterView from "./CritterView";
import Controls from "./Controls";
import Critters from "./Critters";
import "./App.css";
import "nes.css/css/nes.min.css";

const CONTRACT_ADDRESS = "";
const contractABI = "";

function App() {
  const [critters, setCritters] = useState([]);
  const [contract, setContract] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <Controls setCritters={setCritters} setContract={setContract} />
      </header>
      <Critters critters={critters} contract={contract} />
    </div>
  );
}

export default App;
