import CritterView from "../CritterView";
import "./style.css";

const Critters = ({ contract, critters = [] }) => {
  const getCritterDetails = (critterID) => {
    console.log(`getting critter details for ID ${critterID}`);
    contract.methods.critters(critterID).call();
  };

  const makeCritters = () =>
    critters
      .map((critterID) => {
        const critterData = getCritterDetails(critterID);
        return <CritterView data={critterData} critterID={critterID} />;
      })
      .concat([
        <CritterView real={false} />,
        <CritterView real={false} />,
        <CritterView real={false} />,
      ]);

  return <div className="critters">{makeCritters()}</div>;
};

export default Critters;
