pragma solidity ^0.8.0;

import "./tokens/nf-token.sol";
import "./CritterBase.sol";

contract CritterOwnership is CritterBase, ERC721 {
    string public constant name = "CryptoCritters";
    string public constant symbol = "CK";

    ERC721Metadata public erc721Metadata;

    bytes4 constant InterfaceSignature_ERC165 =
        bytes4(keccak256("supportsInterface(bytes4)"));

    bytes4 constant InterfaceSignature_ERC721 =
        bytes4(keccak256("name()")) ^
            bytes4(keccak256("symbol()")) ^
            bytes4(keccak256("totalSupply()")) ^
            bytes4(keccak256("balanceOf(address)")) ^
            bytes4(keccak256("ownerOf(uint256)")) ^
            bytes4(keccak256("approve(address,uint256)")) ^
            bytes4(keccak256("transfer(address,uint256)")) ^
            bytes4(keccak256("transferFrom(address,address,uint256)")) ^
            bytes4(keccak256("tokensOfOwner(address)")) ^
            bytes4(keccak256("tokenMetadata(uint256,string)"));

    function supportsInterface(bytes4 _interfaceID)
        external
        view
        returns (bool)
    {
        return ((_interfaceID == InterfaceSignature_ERC165) ||
            (_interfaceID == InterfaceSignature_ERC721));
    }

    function setMetadataAddress(address _contractAddress) public onlyCEO {
        erc721Metadata = ERC721Metadata(_contractAddress);
    }

    function _owns(address _claimant, uint256 _tokenId)
        internal
        view
        returns (bool)
    {
        return critterIndexToOwner[_tokenId] == _claimant;
    }

    function _approvedFor(address _claimant, uint256 _tokenId)
        internal
        view
        returns (bool)
    {
        return critterIndexToApproved[_tokenId] == _claimant;
    }

    function _approve(uint256 _tokenId, address _approved) internal {
        critterIndexToApproved[_tokenId] = _approved;
    }

    function balanceOf(address _owner) public view returns (uint256 count) {
        return ownershipTokenCount[_owner];
    }

    function transfer(address _to, uint256 _tokenId) external whenNotPaused {
        require(_to != address(0));
        require(_to != address(this));
        require(_to != address(saleAuction));
        require(_to != address(siringAuction));

        require(_owns(msg.sender, _tokenId));

        _transfer(msg.sender, _to, _tokenId);
    }

    function approve(address _to, uint256 _tokenId) external whenNotPaused {
        require(_owns(msg.sender, _tokenId));

        _approve(_tokenId, _to);

        Approval(msg.sender, _to, _tokenId);
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) external whenNotPaused {
        require(_to != address(0));
        require(_to != address(this));
        require(_approvedFor(msg.sender, _tokenId));
        require(_owns(_from, _tokenId));

        _transfer(_from, _to, _tokenId);
    }

    function totalSupply() public view returns (uint256) {
        return critters.length - 1;
    }

    function ownerOf(uint256 _tokenId) external view returns (address owner) {
        owner = critterIndexToOwner[_tokenId];

        require(owner != address(0));
    }

    function tokensOfOwner(address _owner)
        external
        view
        returns (uint256[] ownerTokens)
    {
        uint256 tokenCount = balanceOf(_owner);

        if (tokenCount == 0) {
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](tokenCount);
            uint256 totalCritters = totalSupply();
            uint256 resultIndex = 0;

            uint256 critterId;

            for (critterId = 1; critterId <= totalCritters; critterId++) {
                if (critterIndexToOwner[critterId] == _owner) {
                    result[resultIndex] = critterId;
                    resultIndex++;
                }
            }

            return result;
        }
    }

    function _memcpy(
        uint256 _dest,
        uint256 _src,
        uint256 _len
    ) private view {
        for (; _len >= 32; _len -= 32) {
            assembly {
                mstore(_dest, mload(_src))
            }
            _dest += 32;
            _src += 32;
        }

        uint256 mask = 256**(32 - _len) - 1;
        assembly {
            let srcpart := and(mload(_src), not(mask))
            let destpart := and(mload(_dest), mask)
            mstore(_dest, or(destpart, srcpart))
        }
    }

    function _toString(bytes32[4] _rawBytes, uint256 _stringLength)
        private
        view
        returns (string)
    {
        var outputString = new string(_stringLength);
        uint256 outputPtr;
        uint256 bytesPtr;

        assembly {
            outputPtr := add(outputString, 32)
            bytesPtr := _rawBytes
        }

        _memcpy(outputPtr, bytesPtr, _stringLength);

        return outputString;
    }

    function tokenMetadata(uint256 _tokenId, string _preferredTransport)
        external
        view
        returns (string infoUrl)
    {
        require(erc721Metadata != address(0));
        bytes32[4] memory buffer;
        uint256 count;
        (buffer, count) = erc721Metadata.getMetadata(
            _tokenId,
            _preferredTransport
        );

        return _toString(buffer, count);
    }
}
