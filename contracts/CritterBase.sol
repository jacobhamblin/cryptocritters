pragma solidity ^0.4.11;

import "./CritterAccessControl.sol";

contract SaleClockAuction is ClockAuction {
    bool public isSaleClockAuction = true;

    uint256 public gen0SaleCount;
    uint256[5] public lastGen0SalePrices;

    function SaleClockAuction(address _nftAddr, uint256 _cut)
        public
        ClockAuction(_nftAddr, _cut)
    {}

    function createAuction(
        uint256 _tokenId,
        uint256 _startingPrice,
        uint256 _endingPrice,
        uint256 _duration,
        address _seller
    ) external {
        require(_startingPrice == uint256(uint128(_startingPrice)));
        require(_endingPrice == uint256(uint128(_endingPrice)));
        require(_duration == uint256(uint64(_duration)));

        require(msg.sender == address(nonFungibleContract));
        _escrow(_seller, _tokenId);
        Auction memory auction =
            Auction(
                _seller,
                uint128(_startingPrice),
                uint128(_endingPrice),
                uint64(_duration),
                uint64(now)
            );
        _addAuction(_tokenId, auction);
    }

    function bid(uint256 _tokenId) external payable {
        address seller = tokenIdToAuction[_tokenId].seller;
        uint256 price = _bid(_tokenId, msg.value);
        _transfer(msg.sender, _tokenId);

        if (seller == address(nonFungibleContract)) {
            lastGen0SalePrices[gen0SaleCount % 5] = price;
            gen0SaleCount++;
        }
    }

    function averageGen0SalePrice() external view returns (uint256) {
        uint256 sum = 0;
        for (uint256 i = 0; i < 5; i++) {
            sum += lastGen0SalePrices[i];
        }
        return sum / 5;
    }
}

contract CritterBase is CritterAccessControl {
    event Birth(
        address owner,
        uint256 critterId,
        uint256 matronId,
        uint256 sireId,
        uint256 genes
    );

    event Transfer(address from, address to, uint256 tokenId);

    struct Critter {
        uint256 genes;
        uint64 birthTime;
        uint64 cooldownEndBlock;
        uint32 matronId;
        uint32 sireId;
        uint32 siringWithId;
        uint16 cooldownIndex;
        uint16 generation;
    }

    uint32[14] public cooldowns = [
        uint32(1 minutes),
        uint32(2 minutes),
        uint32(5 minutes),
        uint32(10 minutes),
        uint32(30 minutes),
        uint32(1 hours),
        uint32(2 hours),
        uint32(4 hours),
        uint32(8 hours),
        uint32(16 hours),
        uint32(1 days),
        uint32(2 days),
        uint32(4 days),
        uint32(7 days)
    ];

    uint256 public secondsPerBlock = 15;

    Critter[] critters;
    mapping(uint256 => address) public critterIndexToOwner;

    mapping(address => uint256) ownershipTokenCount;

    mapping(uint256 => address) public critterIndexToApproved;

    mapping(uint256 => address) public sireAllowedToAddress;

    SaleClockAuction public saleAuction;

    SiringClockAuction public siringAuction;

    function _transfer(
        address _from,
        address _to,
        uint256 _tokenId
    ) internal {
        ownershipTokenCount[_to]++;
        critterIndexToOwner[_tokenId] = _to;
        if (_from != address(0)) {
            ownershipTokenCount[_from]--;
            delete sireAllowedToAddress[_tokenId];
            delete critterIndexToApproved[_tokenId];
        }
        Transfer(_from, _to, _tokenId);
    }

    function _createCritter(
        uint256 _matronId,
        uint256 _sireId,
        uint256 _generation,
        uint256 _genes,
        address _owner
    ) internal returns (uint256) {
        require(_matronId == uint256(uint32(_matronId)));
        require(_sireId == uint256(uint32(_sireId)));
        require(_generation == uint256(uint16(_generation)));

        uint16 cooldownIndex = uint16(_generation / 2);
        if (cooldownIndex > 13) {
            cooldownIndex = 13;
        }

        Critter memory _critter =
            Critter({
                genes: _genes,
                birthTime: uint64(now),
                cooldownEndBlock: 0,
                matronId: uint32(_matronId),
                sireId: uint32(_sireId),
                siringWithId: 0,
                cooldownIndex: cooldownIndex,
                generation: uint16(_generation)
            });
        uint256 newCritterId = critters.push(_critter) - 1;

        require(newCritterId == uint256(uint32(newCritterId)));

        Birth(
            _owner,
            newCritterId,
            uint256(_critter.matronId),
            uint256(_critter.sireId),
            _critter.genes
        );

        _transfer(0, _owner, newCritterId);

        return newCritterId;
    }

    function setSecondsPerBlock(uint256 secs) external onlyCLevel {
        require(secs < cooldowns[0]);
        secondsPerBlock = secs;
    }
}
