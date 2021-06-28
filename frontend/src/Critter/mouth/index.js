import aquaticOne from "../../../assets/mouth/aquatic/1.png";
import aquaticTwo from "../../../assets/mouth/aquatic/2.png";
import aquaticThree from "../../../assets/mouth/aquatic/3.png";
import aquaticFour from "../../../assets/mouth/aquatic/4.png";
import aquaticFive from "../../../assets/mouth/aquatic/5.png";
import aquaticSix from "../../../assets/mouth/aquatic/6.png";
import aquaticSeven from "../../../assets/mouth/aquatic/7.png";
import aquaticEight from "../../../assets/mouth/aquatic/8.png";
import aquaticNine from "../../../assets/mouth/aquatic/9.png";

import beastOne from "../../../assets/mouth/beast/1.png";
import beastTwo from "../../../assets/mouth/beast/2.png";
import beastThree from "../../../assets/mouth/beast/3.png";
import beastFour from "../../../assets/mouth/beast/4.png";
import beastFive from "../../../assets/mouth/beast/5.png";
import beastSix from "../../../assets/mouth/beast/6.png";
import beastSeven from "../../../assets/mouth/beast/7.png";
import beastEight from "../../../assets/mouth/beast/8.png";

import birdOne from "../../../assets/mouth/bird/1.png";
import birdTwo from "../../../assets/mouth/bird/2.png";
import birdThree from "../../../assets/mouth/bird/3.png";
import birdFour from "../../../assets/mouth/bird/4.png";
import birdFive from "../../../assets/mouth/bird/5.png";
import birdSix from "../../../assets/mouth/bird/6.png";
import birdSeven from "../../../assets/mouth/bird/7.png";

import bugOne from "../../../assets/mouth/bug/1.png";
import bugTwo from "../../../assets/mouth/bug/2.png";
import bugThree from "../../../assets/mouth/bug/3.png";
import bugFour from "../../../assets/mouth/bug/4.png";
import bugFive from "../../../assets/mouth/bug/5.png";
import bugSix from "../../../assets/mouth/bug/6.png";
import bugSeven from "../../../assets/mouth/bug/7.png";

import plantOne from "../../../assets/mouth/plant/1.png";
import plantTwo from "../../../assets/mouth/plant/2.png";
import plantThree from "../../../assets/mouth/plant/3.png";
import plantFour from "../../../assets/mouth/plant/4.png";
import plantFive from "../../../assets/mouth/plant/5.png";
import plantSix from "../../../assets/mouth/plant/6.png";
import plantSeven from "../../../assets/mouth/plant/7.png";

import reptileOne from "../../../assets/mouth/reptile/1.png";
import reptileTwo from "../../../assets/mouth/reptile/2.png";
import reptileThree from "../../../assets/mouth/reptile/3.png";
import reptileFour from "../../../assets/mouth/reptile/4.png";
import reptileFive from "../../../assets/mouth/reptile/5.png";
import reptileSix from "../../../assets/mouth/reptile/6.png";
import reptileSeven from "../../../assets/mouth/reptile/7.png";

const counts = {
  aquatic: 6,
  beast: 5,
  bird: 5,
  bug: 6,
  plant: 4,
  reptile: 5,
}

const selection = {
  aquatic: [aquaticOne, aquaticTwo, aquaticThree, aquaticFour, aquaticFive, aquaticSix],
  beast: [beastOne, beastTwo, beastThree, beastFour, beastFive],
  bird: [birdOne, birdTwo, birdThree, birdFour, birdFive],
  bug: [bugOne, bugTwo, bugThree, bugFour, bugFive, bugSix],
  plant: [plantOne, plantTwo, plantThree, plantFour],
  reptile: [reptileOne, reptileTwo, reptileThree, reptileFour, reptileFive],
}

const classAssignment = [
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
];

// preliminary expectation for data: number between 00 and 99, inclusive
// first digit determines class
// second digit determines asset within class

const Mouth = ({data}) => {
  const group = selection[classAssignment[Math.floor(data / 10)]];
  const individual = data % 10;
  const src = group[individual - 1 % group.length]
  return (
    <img src={src} />
  );
};

export default Mouth;
