pragma solidity ^0.4.11;

import "./ClockAuction.sol";

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
