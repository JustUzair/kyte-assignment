// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;
import "./CustomNFT.sol";
contract ERC721Collection {
    address public immutable owner;
    uint256 constant FEE = 1000000000000000;
    uint256 constant NFT_PRICE = 0.01 ether;
    address[] collections;

    mapping(address /*collection*/ => address/*owner*/) public ownerOf;
    mapping(address /*owner*/ => address[] /*collections*/) public collectionAddresses;
    mapping(address /*collectionAddress*/ => mapping(uint256 /*tokenID*/ => bool /*isMinted*/)) public mintedTokens;

    event CollectionCreated(address indexed creator, address collectionAddress);
    event NFTMinted(address indexed creator, address collectionAddress, uint256 tokenId);

    constructor() {
        owner = msg.sender;
    }
    function createCollection(string memory name, string memory symbol,string memory _tokenURI) public returns(address) {
        CustomNFT newCollection = new CustomNFT(name, symbol,_tokenURI);
        collectionAddresses[msg.sender].push(address(newCollection));
        collections.push(address(newCollection));
        ownerOf[address(newCollection)]=address(msg.sender);
        emit CollectionCreated(msg.sender, address(newCollection));
        return address(newCollection);
    
    }

    function mintNFT(address collectionOwner, address collectionAddress) public {
        CustomNFT collection = CustomNFT(collectionAddress);
        uint256 tokenId = collection.getCurrentTokenId();

        // requrie(msg.value >= (FEE + NFT_PRICE), "not enough to buy"); ----> to make nft buyable
        require(collectionAddresses[collectionOwner].length > 0, "owner hasnt created any collections yet.");
        require(!mintedTokens[collectionAddress][tokenId], "Token ID already minted.");

       
        collection.mint(msg.sender);
        mintedTokens[collectionAddress][tokenId] = true;

        emit NFTMinted(msg.sender, collectionAddress, tokenId);
    }

    function getTotalCollections(address collectionOwner) public view returns(uint256) {
        return collectionAddresses[collectionOwner].length;
    }

    function getCollections(address collectionOwner) public view returns(address[] memory) {
        return collectionAddresses[collectionOwner];
    }
    function getAllCollections() public view returns(address[] memory){
        return collections;
    }
    
    

}