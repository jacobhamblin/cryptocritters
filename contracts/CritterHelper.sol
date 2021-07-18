pragma solidity ^0.4.25;

import "./CritterFactory.sol";

contract KittyInterface {
    function getKitty(uint256 _id)
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
        );
}

contract CritterHelper is CritterFactory {
    modifier onlyOwnerOf(uint256 _critterId) {
        require(msg.sender == critterToOwner[_critterId]);
        _;
    }

    function getCrittersByOwner(address _owner)
        external
        view
        returns (uint256[])
    {
        uint256[] memory result = new uint256[](ownerCritterCount[_owner]);
        uint256 counter = 0;
        for (uint256 i = 0; i < critters.length; i++) {
            if (critterToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }
}
