import Critter from "../Critter";

import "./style.css";

const CritterView = ({ data = {}, critterID }) => {
  let placeholderData = Math.floor(Math.random() * 100000000000000);
  const { dna } = data;
  console.log(dna);
  console.log(data);

  const dnaData = dna;
  // const dnaData = placeholderData;
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

  console.log("segments");
  console.log(segments);

  return (
    <div className="CritterView">
      <h2>Critter</h2>
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
