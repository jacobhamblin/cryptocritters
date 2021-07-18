import { useState } from "react";
import CritterView from "./CritterView";
import Controls from "./Controls";
import Critters from "./Critters";
import "./App.css";

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
      <Critters critters={critters} CryptoCritters={contract} />
      <CritterView />
    </div>
  );
}

export default App;
