pragma solidity ^0.4.11;

import "./CritterAuction.sol";

contract CritterMinting is CritterAuction {
    uint256 public constant PROMO_CREATION_LIMIT = 5000;
    uint256 public constant GEN0_CREATION_LIMIT = 45000;

    uint256 public constant GEN0_STARTING_PRICE = 10 finney;
    uint256 public constant GEN0_AUCTION_DURATION = 1 days;

    uint256 public promoCreatedCount;
    uint256 public gen0CreatedCount;

    function createPromoCritter(uint256 _genes, address _owner)
        external
        onlyCOO
    {
        address critterOwner = _owner;
        if (critterOwner == address(0)) {
            critterOwner = cooAddress;
        }
        require(promoCreatedCount < PROMO_CREATION_LIMIT);

        promoCreatedCount++;
        _createCritter(0, 0, 0, _genes, critterOwner);
    }

    function createGen0Auction(uint256 _genes) external onlyCOO {
        require(gen0CreatedCount < GEN0_CREATION_LIMIT);

        uint256 critterId = _createCritter(0, 0, 0, _genes, address(this));
        _approve(critterId, saleAuction);

        saleAuction.createAuction(
            critterId,
            _computeNextGen0Price(),
            0,
            GEN0_AUCTION_DURATION,
            address(this)
        );

        gen0CreatedCount++;
    }

    function _computeNextGen0Price() internal view returns (uint256) {
        uint256 avePrice = saleAuction.averageGen0SalePrice();

        require(avePrice == uint256(uint128(avePrice)));

        uint256 nextPrice = avePrice + (avePrice / 2);

        if (nextPrice < GEN0_STARTING_PRICE) {
            nextPrice = GEN0_STARTING_PRICE;
        }

        return nextPrice;
    }
}
