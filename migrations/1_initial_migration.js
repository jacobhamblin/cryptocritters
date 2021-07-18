const Migrations = artifacts.require("CritterCore");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
