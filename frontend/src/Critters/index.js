const Critters = ({ CryptoCritters }) => {
  const getCritterDetails = (critterID) =>
    CryptoCritters.methods.critters(critterID).call();
};

export default Critters;
