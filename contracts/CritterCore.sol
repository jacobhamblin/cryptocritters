pragma solidity ^0.4.11;

import "./CritterMinting.sol";

contract CritterCore is CritterMinting {
    address public newContractAddress;

    function CritterCore() public {
        paused = true;

        ceoAddress = msg.sender;

        cooAddress = msg.sender;

        _createCritter(0, 0, 0, uint256(-1), address(0));
    }

    function setNewAddress(address _v2Address) external onlyCEO whenPaused {
        newContractAddress = _v2Address;
        ContractUpgrade(_v2Address);
    }

    function() external payable {
        require(
            msg.sender == address(saleAuction) ||
                msg.sender == address(siringAuction)
        );
    }

    function getCritter(uint256 _id)
        external
        view
        returns (
            bool isGestating,
            bool isReady,
            uint256 cooldownIndex,
            uint256 nextActionAt,
            uint256 siringWithId,
            uint256 birthTime,
            uint256 matronId,
            uint256 sireId,
            uint256 generation,
            uint256 genes
        )
    {
        Critter storage crit = critters[_id];

        isGestating = (crit.siringWithId != 0);
        isReady = (crit.cooldownEndBlock <= block.number);
        cooldownIndex = uint256(crit.cooldownIndex);
        nextActionAt = uint256(crit.cooldownEndBlock);
        siringWithId = uint256(crit.siringWithId);
        birthTime = uint256(crit.birthTime);
        matronId = uint256(crit.matronId);
        sireId = uint256(crit.sireId);
        generation = uint256(crit.generation);
        genes = crit.genes;
    }

    function unpause() public onlyCEO whenPaused {
        require(saleAuction != address(0));
        require(siringAuction != address(0));
        require(geneScience != address(0));
        require(newContractAddress == address(0));

        super.unpause();
    }

    function withdrawBalance() external onlyCFO {
        uint256 balance = this.balance;
        uint256 subtractFees = (pregnantCritters + 1) * autoBirthFee;

        if (balance > subtractFees) {
            cfoAddress.send(balance - subtractFees);
        }
    }
}
