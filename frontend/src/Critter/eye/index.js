import aquaticOne from "../../assets/eye/aquatic/1.png";
import aquaticTwo from "../../assets/eye/aquatic/2.png";
import aquaticThree from "../../assets/eye/aquatic/3.png";
import aquaticFour from "../../assets/eye/aquatic/4.png";
import aquaticFive from "../../assets/eye/aquatic/5.png";
import aquaticSix from "../../assets/eye/aquatic/6.png";

import beastOne from "../../assets/eye/beast/1.png";
import beastTwo from "../../assets/eye/beast/2.png";
import beastThree from "../../assets/eye/beast/3.png";
import beastFour from "../../assets/eye/beast/4.png";
import beastFive from "../../assets/eye/beast/5.png";

import birdOne from "../../assets/eye/bird/1.png";
import birdTwo from "../../assets/eye/bird/2.png";
import birdThree from "../../assets/eye/bird/3.png";
import birdFour from "../../assets/eye/bird/4.png";
import birdFive from "../../assets/eye/bird/5.png";

import bugOne from "../../assets/eye/bug/1.png";
import bugTwo from "../../assets/eye/bug/2.png";
import bugThree from "../../assets/eye/bug/3.png";
import bugFour from "../../assets/eye/bug/4.png";
import bugFive from "../../assets/eye/bug/5.png";

import plantOne from "../../assets/eye/plant/1.png";
import plantTwo from "../../assets/eye/plant/2.png";
import plantThree from "../../assets/eye/plant/3.png";
import plantFour from "../../assets/eye/plant/4.png";
import plantFive from "../../assets/eye/plant/5.png";

import reptileOne from "../../assets/eye/reptile/1.png";
import reptileTwo from "../../assets/eye/reptile/2.png";
import reptileThree from "../../assets/eye/reptile/3.png";
import reptileFour from "../../assets/eye/reptile/4.png";
import reptileFive from "../../assets/eye/reptile/5.png";
import reptileSix from "../../assets/eye/reptile/6.png";
import reptileSeven from "../../assets/eye/reptile/7.png";

import "./style.css";

const counts = {
  aquatic: 6,
  beast: 5,
  bird: 5,
  bug: 5,
  plant: 5,
  reptile: 7,
};

const selection = {
  aquatic: [
    aquaticOne,
    aquaticTwo,
    aquaticThree,
    aquaticFour,
    aquaticFive,
    aquaticSix,
  ],
  beast: [beastOne, beastTwo, beastThree, beastFour, beastFive],
  bird: [birdOne, birdTwo, birdThree, birdFour, birdFive],
  bug: [bugOne, bugTwo, bugThree, bugFour, bugFive],
  plant: [plantOne, plantTwo, plantThree, plantFour, plantFive],
  reptile: [
    reptileOne,
    reptileTwo,
    reptileThree,
    reptileFour,
    reptileFive,
    reptileSix,
    reptileSeven,
  ],
};

const classAssignment = {
  0: "aquatic",
  1: "beast",
  2: "bird",
  3: "bug",
  4: "plant",
  5: "reptile",
  6: "beast",
  7: "bird",
  8: "bug",
  9: "beast",
};

// preliminary expectation for data: number between 00 and 99, inclusive
// first digit determines class
// second digit determines asset within class

const Eye = ({ data }) => {
  const group = selection[classAssignment[Math.floor(data / 10)]];
  const individual = data % 10;
  const src = group[individual % group.length];
  return <img src={src} className="Eye" />;
};

export default Eye;
