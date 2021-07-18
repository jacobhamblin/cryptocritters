const Migrations = artifacts.require("CritterOwnershipUpdated");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
