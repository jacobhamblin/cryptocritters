pragma solidity ^0.4.11;

import "./CritterOwnership.sol";
import "./GeneScienceInterface.sol";

contract CritterBreeding is CritterOwnership {
    event Pregnant(
        address owner,
        uint256 matronId,
        uint256 sireId,
        uint256 cooldownEndBlock
    );
    uint256 public autoBirthFee = 2 finney;
    uint256 public pregnantKitties;
    GeneScienceInterface public geneScience;

    function setGeneScienceAddress(address _address) external onlyCEO {
        GeneScienceInterface candidateContract = GeneScienceInterface(_address);
        require(candidateContract.isGeneScience());
        geneScience = candidateContract;
    }

    function _isReadyToBreed(Critter _crit) internal view returns (bool) {
        return
            (_crit.siringWithId == 0) &&
            (_crit.cooldownEndBlock <= uint64(block.number));
    }

    function _isSiringPermitted(uint256 _sireId, uint256 _matronId)
        internal
        view
        returns (bool)
    {
        address matronOwner = critterIndexToOwner[_matronId];
        address sireOwner = critterIndexToOwner[_sireId];
        return (matronOwner == sireOwner ||
            sireAllowedToAddress[_sireId] == matronOwner);
    }

    function _triggerCooldown(Critter storage _critter) internal {
        _critter.cooldownEndBlock = uint64(
            (cooldowns[_critter.cooldownIndex] / secondsPerBlock) + block.number
        );

        if (_critter.cooldownIndex < 13) {
            _critter.cooldownIndex += 1;
        }
    }

    function approveSiring(address _addr, uint256 _sireId)
        external
        whenNotPaused
    {
        require(_owns(msg.sender, _sireId));
        sireAllowedToAddress[_sireId] = _addr;
    }

    function setAutoBirthFee(uint256 val) external onlyCOO {
        autoBirthFee = val;
    }

    function _isReadyToGiveBirth(Critter _matron) private view returns (bool) {
        return
            (_matron.siringWithId != 0) &&
            (_matron.cooldownEndBlock <= uint64(block.number));
    }

    function isReadyToBreed(uint256 _critterId) public view returns (bool) {
        require(_critterId > 0);
        Critter storage crit = critters[_critterId];
        return _isReadyToBreed(crit);
    }

    function isPregnant(uint256 _critterId) public view returns (bool) {
        require(_critterId > 0);
        return critters[_critterId].siringWithId != 0;
    }

    function _isValidMatingPair(
        Critter storage _matron,
        uint256 _matronId,
        Critter storage _sire,
        uint256 _sireId
    ) private view returns (bool) {
        if (_matronId == _sireId) {
            return false;
        }

        if (_matron.matronId == _sireId || _matron.sireId == _sireId) {
            return false;
        }
        if (_sire.matronId == _matronId || _sire.sireId == _matronId) {
            return false;
        }
        if (_sire.matronId == 0 || _matron.matronId == 0) {
            return true;
        }
        if (
            _sire.matronId == _matron.matronId ||
            _sire.matronId == _matron.sireId
        ) {
            return false;
        }
        if (
            _sire.sireId == _matron.matronId || _sire.sireId == _matron.sireId
        ) {
            return false;
        }

        return true;
    }

    function _canBreedWithViaAuction(uint256 _matronId, uint256 _sireId)
        internal
        view
        returns (bool)
    {
        Critter storage matron = critters[_matronId];
        Critter storage sire = critters[_sireId];
        return _isValidMatingPair(matron, _matronId, sire, _sireId);
    }

    function canBreedWith(uint256 _matronId, uint256 _sireId)
        external
        view
        returns (bool)
    {
        require(_matronId > 0);
        require(_sireId > 0);
        Critter storage matron = critters[_matronId];
        Critter storage sire = critters[_sireId];
        return
            _isValidMatingPair(matron, _matronId, sire, _sireId) &&
            _isSiringPermitted(_sireId, _matronId);
    }

    function _breedWith(uint256 _matronId, uint256 _sireId) internal {
        Critter storage sire = critters[_sireId];
        Critter storage matron = critters[_matronId];

        matron.siringWithId = uint32(_sireId);

        _triggerCooldown(sire);
        _triggerCooldown(matron);

        delete sireAllowedToAddress[_matronId];
        delete sireAllowedToAddress[_sireId];

        pregnantKitties++;

        Pregnant(
            critterIndexToOwner[_matronId],
            _matronId,
            _sireId,
            matron.cooldownEndBlock
        );
    }

    function breedWithAuto(uint256 _matronId, uint256 _sireId)
        external
        payable
        whenNotPaused
    {
        require(msg.value >= autoBirthFee);

        require(_owns(msg.sender, _matronId));

        require(_isSiringPermitted(_sireId, _matronId));

        Critter storage matron = critters[_matronId];

        require(_isReadyToBreed(matron));

        Critter storage sire = critters[_sireId];

        require(_isReadyToBreed(sire));

        require(_isValidMatingPair(matron, _matronId, sire, _sireId));

        _breedWith(_matronId, _sireId);
    }

    function giveBirth(uint256 _matronId)
        external
        whenNotPaused
        returns (uint256)
    {
        Critter storage matron = critters[_matronId];

        require(matron.birthTime != 0);

        require(_isReadyToGiveBirth(matron));

        uint256 sireId = matron.siringWithId;
        Critter storage sire = critters[sireId];

        uint16 parentGen = matron.generation;
        if (sire.generation > matron.generation) {
            parentGen = sire.generation;
        }

        uint256 childGenes =
            geneScience.mixGenes(
                matron.genes,
                sire.genes,
                matron.cooldownEndBlock - 1
            );

        address owner = critterIndexToOwner[_matronId];
        uint256 critterId =
            _createCritter(
                _matronId,
                matron.siringWithId,
                parentGen + 1,
                childGenes,
                owner
            );

        delete matron.siringWithId;

        pregnantKitties--;

        msg.sender.send(autoBirthFee);

        return critterId;
    }
}
