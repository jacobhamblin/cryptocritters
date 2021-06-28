import aquaticOne from "../../assets/horn/aquatic/1.png";
import aquaticTwo from "../../assets/horn/aquatic/2.png";
import aquaticThree from "../../assets/horn/aquatic/3.png";
import aquaticFour from "../../assets/horn/aquatic/4.png";
import aquaticFive from "../../assets/horn/aquatic/5.png";
import aquaticSix from "../../assets/horn/aquatic/6.png";
import aquaticSeven from "../../assets/horn/aquatic/7.png";

import beastOne from "../../assets/horn/beast/1.png";
import beastTwo from "../../assets/horn/beast/2.png";
import beastThree from "../../assets/horn/beast/3.png";
import beastFour from "../../assets/horn/beast/4.png";
import beastFive from "../../assets/horn/beast/5.png";
import beastSix from "../../assets/horn/beast/6.png";
import beastSeven from "../../assets/horn/beast/7.png";
import beastEight from "../../assets/horn/beast/8.png";

import birdOne from "../../assets/horn/bird/1.png";
import birdTwo from "../../assets/horn/bird/2.png";
import birdThree from "../../assets/horn/bird/3.png";
import birdFour from "../../assets/horn/bird/4.png";
import birdFive from "../../assets/horn/bird/5.png";
import birdSix from "../../assets/horn/bird/6.png";
import birdSeven from "../../assets/horn/bird/7.png";

import bugOne from "../../assets/horn/bug/1.png";
import bugTwo from "../../assets/horn/bug/2.png";
import bugThree from "../../assets/horn/bug/3.png";
import bugFour from "../../assets/horn/bug/4.png";
import bugFive from "../../assets/horn/bug/5.png";
import bugSix from "../../assets/horn/bug/6.png";

import plantOne from "../../assets/horn/plant/1.png";
import plantTwo from "../../assets/horn/plant/2.png";
import plantThree from "../../assets/horn/plant/3.png";
import plantFour from "../../assets/horn/plant/4.png";
import plantFive from "../../assets/horn/plant/5.png";
import plantSix from "../../assets/horn/plant/6.png";
import plantSeven from "../../assets/horn/plant/7.png";

import reptileOne from "../../assets/horn/reptile/1.png";
import reptileTwo from "../../assets/horn/reptile/2.png";
import reptileThree from "../../assets/horn/reptile/3.png";
import reptileFour from "../../assets/horn/reptile/4.png";
import reptileFive from "../../assets/horn/reptile/5.png";
import reptileSix from "../../assets/horn/reptile/6.png";
import reptileSeven from "../../assets/horn/reptile/7.png";

const counts = {
  aquatic: 7,
  beast: 8,
  bird: 7,
  bug: 6,
  plant: 7,
  reptile: 7,
}

const selection = {
  aquatic: [aquaticOne, aquaticTwo, aquaticThree, aquaticFour, aquaticFive, aquaticSix, aquaticSeven],
  beast: [beastOne, beastTwo, beastThree, beastFour, beastFive, beastSix, beastSeven, beastEight],
  bird: [birdOne, birdTwo, birdThree, birdFour, birdFive, birdSix, birdSeven],
  bug: [bugOne, bugTwo, bugThree, bugFour, bugFive, bugSix],
  plant: [plantOne, plantTwo, plantThree, plantFour, plantFive, plantSix, plantSeven],
  reptile: [reptileOne, reptileTwo, reptileThree, reptileFour, reptileFive, reptileSix, reptileSeven],
}

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

const Horn = ({data}) => {
  const group = selection[classAssignment[Math.floor(data / 10)]];
  const individual = data % 10;
  const src = group[individual - 1 % group.length]
  return (
    <img src={src} />
  );
};

export default Horn;
