pragma solidity ^0.4.25;

import "./OwnableLatest.sol";
import "./SafeMath.sol";

contract CritterFactory is Ownable {
    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;

    event NewCritter(uint256 critterId, string name, uint256 dna);

    uint256 dnaDigits = 16;
    uint256 dnaModulus = 10**dnaDigits;
    uint256 cooldownTime = 1 days;

    struct Critter {
        string name;
        uint256 dna;
        uint32 readyTime;
    }

    Critter[] public critters;

    mapping(uint256 => address) public critterToOwner;
    mapping(address => uint256) ownerCritterCount;

    function _createCritter(string memory _name, uint256 _dna) internal {
        uint256 id =
            critters.push(Critter(_name, _dna, uint32(now + cooldownTime))) - 1;
        critterToOwner[id] = msg.sender;
        ownerCritterCount[msg.sender] = ownerCritterCount[msg.sender].add(1);
        emit NewCritter(id, _name, _dna);
    }

    function _generateRandomDna(string memory _str)
        private
        view
        returns (uint256)
    {
        uint256 rand = uint256(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    function createRandomCritter(string memory _name) public {
        uint256 randDna = _generateRandomDna(_name);
        randDna = randDna - (randDna % 100);
        _createCritter(_name, randDna);
    }
}
