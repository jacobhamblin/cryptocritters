pragma solidity ^0.4.25;

import "./CritterHelper.sol";
import "./ERC721Updated.sol";
import "./SafeMath.sol";

contract CritterOwnership is CritterHelper, ERC721 {
    using SafeMath for uint256;

    mapping(uint256 => address) CritterApprovals;

    function balanceOf(address _owner) external view returns (uint256) {
        return ownerCritterCount[_owner];
    }

    function ownerOf(uint256 _tokenId) external view returns (address) {
        return CritterToOwner[_tokenId];
    }

    function _transfer(
        address _from,
        address _to,
        uint256 _tokenId
    ) private {
        ownerCritterCount[_to] = ownerCritterCount[_to].add(1);
        ownerCritterCount[msg.sender] = ownerCritterCount[msg.sender].sub(1);
        CritterToOwner[_tokenId] = _to;
        emit Transfer(_from, _to, _tokenId);
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) external payable {
        require(
            CritterToOwner[_tokenId] == msg.sender ||
                CritterApprovals[_tokenId] == msg.sender
        );
        _transfer(_from, _to, _tokenId);
    }

    function approve(address _approved, uint256 _tokenId)
        external
        payable
        onlyOwnerOf(_tokenId)
    {
        CritterApprovals[_tokenId] = _approved;
        emit Approval(msg.sender, _approved, _tokenId);
    }
}
