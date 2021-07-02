import aquaticOne from "../../assets/body/aquatic/1.png";
import aquaticTwo from "../../assets/body/aquatic/2.png";
import aquaticThree from "../../assets/body/aquatic/3.png";
import aquaticFour from "../../assets/body/aquatic/4.png";
import aquaticFive from "../../assets/body/aquatic/5.png";

import beastOne from "../../assets/body/beast/1.png";
import beastTwo from "../../assets/body/beast/2.png";
import beastThree from "../../assets/body/beast/3.png";
import beastFour from "../../assets/body/beast/4.png";
import beastFive from "../../assets/body/beast/5.png";

import birdOne from "../../assets/body/bird/1.png";
import birdTwo from "../../assets/body/bird/2.png";
import birdThree from "../../assets/body/bird/3.png";
import birdFour from "../../assets/body/bird/4.png";
import birdFive from "../../assets/body/bird/5.png";

import bugOne from "../../assets/body/bug/1.png";
import bugTwo from "../../assets/body/bug/2.png";
import bugThree from "../../assets/body/bug/3.png";
import bugFour from "../../assets/body/bug/4.png";
import bugFive from "../../assets/body/bug/5.png";

import plantOne from "../../assets/body/plant/1.png";
import plantTwo from "../../assets/body/plant/2.png";
import plantThree from "../../assets/body/plant/3.png";
import plantFour from "../../assets/body/plant/4.png";
import plantFive from "../../assets/body/plant/5.png";

import reptileOne from "../../assets/body/reptile/1.png";
import reptileTwo from "../../assets/body/reptile/2.png";
import reptileThree from "../../assets/body/reptile/3.png";
import reptileFour from "../../assets/body/reptile/4.png";
import reptileFive from "../../assets/body/reptile/5.png";

import "./style.css";

const counts = {
  aquatic: 5,
  beast: 5,
  bird: 5,
  bug: 5,
  plant: 5,
  reptile: 5,
};

const selection = {
  aquatic: [aquaticOne, aquaticTwo, aquaticThree, aquaticFour, aquaticFive],
  beast: [beastOne, beastTwo, beastThree, beastFour, beastFive],
  bird: [birdOne, birdTwo, birdThree, birdFour, birdFive],
  bug: [bugOne, bugTwo, bugThree, bugFour, bugFive],
  plant: [plantOne, plantTwo, plantThree, plantFour, plantFive],
  reptile: [reptileOne, reptileTwo, reptileThree, reptileFour, reptileFive],
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

const Body = ({ data }) => {
  const group = selection[classAssignment[Math.floor(data / 10)]];
  const individual = data % 10;
  const src = group[individual % group.length];
  return <img src={src} className="Body" />;
};

export default Body;
