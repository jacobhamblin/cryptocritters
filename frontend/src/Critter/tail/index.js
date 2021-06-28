import aquaticOne from "../../assets/tail/aquatic/1.png";
import aquaticTwo from "../../assets/tail/aquatic/2.png";
import aquaticThree from "../../assets/tail/aquatic/3.png";
import aquaticFour from "../../assets/tail/aquatic/4.png";
import aquaticFive from "../../assets/tail/aquatic/5.png";
import aquaticSix from "../../assets/tail/aquatic/6.png";
import aquaticSeven from "../../assets/tail/aquatic/7.png";

import beastOne from "../../assets/tail/beast/1.png";
import beastTwo from "../../assets/tail/beast/2.png";
import beastThree from "../../assets/tail/beast/3.png";
import beastFour from "../../assets/tail/beast/4.png";
import beastFive from "../../assets/tail/beast/5.png";
import beastSix from "../../assets/tail/beast/6.png";
import beastSeven from "../../assets/tail/beast/7.png";

import birdOne from "../../assets/tail/bird/1.png";
import birdTwo from "../../assets/tail/bird/2.png";
import birdThree from "../../assets/tail/bird/3.png";
import birdFour from "../../assets/tail/bird/4.png";
import birdFive from "../../assets/tail/bird/5.png";
import birdSix from "../../assets/tail/bird/6.png";
import birdSeven from "../../assets/tail/bird/7.png";

import bugOne from "../../assets/tail/bug/1.png";
import bugTwo from "../../assets/tail/bug/2.png";
import bugThree from "../../assets/tail/bug/3.png";
import bugFour from "../../assets/tail/bug/4.png";
import bugFive from "../../assets/tail/bug/5.png";
import bugSix from "../../assets/tail/bug/6.png";
import bugSeven from "../../assets/tail/bug/7.png";

import plantOne from "../../assets/tail/plant/1.png";
import plantTwo from "../../assets/tail/plant/2.png";
import plantThree from "../../assets/tail/plant/3.png";
import plantFour from "../../assets/tail/plant/4.png";
import plantFive from "../../assets/tail/plant/5.png";
import plantSix from "../../assets/tail/plant/6.png";
import plantSeven from "../../assets/tail/plant/7.png";

import reptileOne from "../../assets/tail/reptile/1.png";
import reptileTwo from "../../assets/tail/reptile/2.png";
import reptileThree from "../../assets/tail/reptile/3.png";
import reptileFour from "../../assets/tail/reptile/4.png";
import reptileFive from "../../assets/tail/reptile/5.png";
import reptileSix from "../../assets/tail/reptile/6.png";
import reptileSeven from "../../assets/tail/reptile/7.png";

const counts = {
  aquatic: 7,
  beast: 7,
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

const Tail = ({ data }) => {
  const group = selection[classAssignment[Math.floor(data / 10)]];
  const individual = data % 10;
  const src = group[individual % group.length];
  console.log("data");
  console.log(data);
  console.log("group");
  console.log(group);
  console.log("individual");
  console.log(individual);
  console.log("src");
  console.log(src);
  return <img src={src} />;
};

export default Tail;
