import aquaticOne from "../../assets/back/aquatic/1.png";
import aquaticTwo from "../../assets/back/aquatic/2.png";
import aquaticThree from "../../assets/back/aquatic/3.png";
import aquaticFour from "../../assets/back/aquatic/4.png";
import aquaticFive from "../../assets/back/aquatic/5.png";
import aquaticSix from "../../assets/back/aquatic/6.png";
import aquaticSeven from "../../assets/back/aquatic/7.png";
import aquaticEight from "../../assets/back/aquatic/8.png";
import aquaticNine from "../../assets/back/aquatic/9.png";

import beastOne from "../../assets/back/beast/1.png";
import beastTwo from "../../assets/back/beast/2.png";
import beastThree from "../../assets/back/beast/3.png";
import beastFour from "../../assets/back/beast/4.png";
import beastFive from "../../assets/back/beast/5.png";
import beastSix from "../../assets/back/beast/6.png";
import beastSeven from "../../assets/back/beast/7.png";
import beastEight from "../../assets/back/beast/8.png";

import birdOne from "../../assets/back/bird/1.png";
import birdTwo from "../../assets/back/bird/2.png";
import birdThree from "../../assets/back/bird/3.png";
import birdFour from "../../assets/back/bird/4.png";
import birdFive from "../../assets/back/bird/5.png";
import birdSix from "../../assets/back/bird/6.png";
import birdSeven from "../../assets/back/bird/7.png";

import bugOne from "../../assets/back/bug/1.png";
import bugTwo from "../../assets/back/bug/2.png";
import bugThree from "../../assets/back/bug/3.png";
import bugFour from "../../assets/back/bug/4.png";
import bugFive from "../../assets/back/bug/5.png";
import bugSix from "../../assets/back/bug/6.png";
import bugSeven from "../../assets/back/bug/7.png";

import plantOne from "../../assets/back/plant/1.png";
import plantTwo from "../../assets/back/plant/2.png";
import plantThree from "../../assets/back/plant/3.png";
import plantFour from "../../assets/back/plant/4.png";
import plantFive from "../../assets/back/plant/5.png";
import plantSix from "../../assets/back/plant/6.png";
import plantSeven from "../../assets/back/plant/7.png";

import reptileOne from "../../assets/back/reptile/1.png";
import reptileTwo from "../../assets/back/reptile/2.png";
import reptileThree from "../../assets/back/reptile/3.png";
import reptileFour from "../../assets/back/reptile/4.png";
import reptileFive from "../../assets/back/reptile/5.png";
import reptileSix from "../../assets/back/reptile/6.png";
import reptileSeven from "../../assets/back/reptile/7.png";

import "./style.css";

const counts = {
  aquatic: 9,
  beast: 8,
  bird: 7,
  bug: 7,
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
    aquaticEight,
    aquaticNine,
  ],
  beast: [
    beastOne,
    beastTwo,
    beastThree,
    beastFour,
    beastFive,
    beastSix,
    beastSeven,
    beastEight,
  ],
  bird: [birdOne, birdTwo, birdThree, birdFour, birdFive, birdSix, birdSeven],
  bug: [bugOne, bugTwo, bugThree, bugFour, bugFive, bugSix, bugSeven],
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

const Back = ({ data }) => {
  const group = selection[classAssignment[Math.floor(data / 10)]];
  const individual = data % 10;
  const src = group[individual % group.length];
  console.log("horn data", data, "group", group, "individual", individual);
  console.log(individual % group.length);
  return <img src={src} className="Back" />;
};

export default Back;
