import CritterView from "../CritterView";
import "./style.css";

const Critters = ({ contract, critters = [] }) => {
  const makeCritters = () => {
    return critters
      .map((critterData) => {
        return <CritterView data={critterData} />;
      })
      .concat([
        <CritterView real={false} />,
        <CritterView real={false} />,
        <CritterView real={false} />,
      ]);
  };

  return <div className="critters">{makeCritters()}</div>;
};

export default Critters;
