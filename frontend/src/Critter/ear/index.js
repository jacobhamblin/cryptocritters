import aquaticOne from "../../assets/ear/aquatic/1.png";
import aquaticTwo from "../../assets/ear/aquatic/2.png";
import aquaticThree from "../../assets/ear/aquatic/3.png";
import aquaticFour from "../../assets/ear/aquatic/4.png";
import aquaticFive from "../../assets/ear/aquatic/5.png";
import aquaticSix from "../../assets/ear/aquatic/6.png";
import aquaticSeven from "../../assets/ear/aquatic/7.png";

import beastOne from "../../assets/ear/beast/1.png";
import beastTwo from "../../assets/ear/beast/2.png";
import beastThree from "../../assets/ear/beast/3.png";
import beastFour from "../../assets/ear/beast/4.png";
import beastFive from "../../assets/ear/beast/5.png";
import beastSix from "../../assets/ear/beast/6.png";
import beastSeven from "../../assets/ear/beast/7.png";

import birdOne from "../../assets/ear/bird/1.png";
import birdTwo from "../../assets/ear/bird/2.png";
import birdThree from "../../assets/ear/bird/3.png";
import birdFour from "../../assets/ear/bird/4.png";
import birdFive from "../../assets/ear/bird/5.png";
import birdSix from "../../assets/ear/bird/6.png";
import birdSeven from "../../assets/ear/bird/7.png";

import bugOne from "../../assets/ear/bug/1.png";
import bugTwo from "../../assets/ear/bug/2.png";
import bugThree from "../../assets/ear/bug/3.png";
import bugFour from "../../assets/ear/bug/4.png";
import bugFive from "../../assets/ear/bug/5.png";
import bugSix from "../../assets/ear/bug/6.png";

import plantOne from "../../assets/ear/plant/1.png";
import plantTwo from "../../assets/ear/plant/2.png";
import plantThree from "../../assets/ear/plant/3.png";
import plantFour from "../../assets/ear/plant/4.png";
import plantFive from "../../assets/ear/plant/5.png";
import plantSix from "../../assets/ear/plant/6.png";
import plantSeven from "../../assets/ear/plant/7.png";

import reptileOne from "../../assets/ear/reptile/1.png";
import reptileTwo from "../../assets/ear/reptile/2.png";
import reptileThree from "../../assets/ear/reptile/3.png";
import reptileFour from "../../assets/ear/reptile/4.png";
import reptileFive from "../../assets/ear/reptile/5.png";
import reptileSix from "../../assets/ear/reptile/6.png";
import reptileSeven from "../../assets/ear/reptile/7.png";

import "./style.css";

const counts = {
  aquatic: 7,
  beast: 7,
  bird: 7,
  bug: 6,
  plant: 7,
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
    aquaticSeven,
  ],
  beast: [
    beastOne,
    beastTwo,
    beastThree,
    beastFour,
    beastFive,
    beastSix,
    beastSeven,
  ],
  bird: [birdOne, birdTwo, birdThree, birdFour, birdFive, birdSix, birdSeven],
  bug: [bugOne, bugTwo, bugThree, bugFour, bugFive, bugSix],
  plant: [
    plantOne,
    plantTwo,
    plantThree,
    plantFour,
    plantFive,
    plantSix,
    plantSeven,
  ],
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

const Ear = ({ data }) => {
  const group = selection[classAssignment[Math.floor(data / 10)]];
  const individual = data % 10;
  const src = group[individual % group.length];
  return <img src={src} className="Ear" />;
};

export default Ear;
