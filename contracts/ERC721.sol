pragma solidity ^0.4.11;

contract ERC721 {
    function totalSupply() public view returns (uint256 total);

    function balanceOf(address _owner) public view returns (uint256 balance);

    function ownerOf(uint256 _tokenId) external view returns (address owner);

    function approve(address _to, uint256 _tokenId) external;

    function transfer(address _to, uint256 _tokenId) external;

    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) external;

    event Transfer(address from, address to, uint256 tokenId);
    event Approval(address owner, address approved, uint256 tokenId);

    function supportsInterface(bytes4 _interfaceID)
        external
        view
        returns (bool);
}

contract ERC721Metadata {
    function getMetadata(uint256 _tokenId, string)
        public
        view
        returns (bytes32[4] buffer, uint256 count)
    {
        if (_tokenId == 1) {
            buffer[0] = "Hey there";
            count = 15;
        } else if (_tokenId == 2) {
            buffer[0] = "String is a bit length might nee";
            buffer[1] = "d two lines.";
            count = 49;
        } else if (_tokenId == 3) {
            buffer[0] = "Lorem ipsum dolor sit amet, mi e";
            buffer[1] = "st accumsan dapibus augue lorem,";
            buffer[2] = " tristique vestibulum id, libero";
            buffer[3] = " suscipit varius sapien aliquam.";
            count = 128;
        }
    }
}
