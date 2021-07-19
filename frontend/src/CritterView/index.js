import classNames from "classnames";
import Critter from "../Critter";

import "./style.css";

const CritterView = ({ data = {}, real = true, small = true }) => {
  let placeholderData = Math.floor(Math.random() * 100000000000000);
  const { dna } = data;
  if (real) console.log("dna", dna);

  let dnaData = real ? dna : placeholderData;
  const segments = {
    back: 0,
    body: 0,
    ear: 0,
    eye: 0,
    horn: 0,
    mouth: 0,
    tail: 0,
  };
  Object.keys(segments).forEach((segment) => {
    segments[segment] = dnaData % 100;
    dnaData = Math.floor(dnaData / 100);
  });

  return (
    <div
      className={classNames({
        CritterView: true,
        small,
      })}
    >
      <Critter
        back={segments["back"]}
        body={segments["body"]}
        ear={segments["ear"]}
        eye={segments["eye"]}
        horn={segments["horn"]}
        mouth={segments["mouth"]}
        tail={segments["tail"]}
      />
    </div>
  );
};

export default CritterView;
