// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Test} from "forge-std/Test.sol";
import {console2} from "forge-std/console2.sol";
import {CustomNFT} from "../src/CustomNFT.sol";
import {ERC721Collection} from "../src/ERC721Collection.sol";
import {IERC721} from "@openzeppelin/contracts/interfaces/IERC721.sol";

contract CollectionTest is Test{
    CustomNFT nft;
    ERC721Collection erc721Collection;
    address owner = makeAddr("owner");

    function setUp() public {
        vm.startPrank(owner);
        // test with this pinned uri on ipfs :ipfs://QmSr3FYVuADykPVc9q1m5WGyzoMYsWJcpnRxATNn1muQVV
        erc721Collection = new ERC721Collection();
        erc721Collection.createCollection("MyPFPCollection","MyPFP","ipfs://QmSr3FYVuADykPVc9q1m5WGyzoMYsWJcpnRxATNn1muQVV");
        console2.log("ERC721 Collection : ",address(erc721Collection));
    }

    function test_checkMintNFTForOwner() public {
        vm.startPrank(owner);
        uint256 totalCollections = erc721Collection.getTotalCollections(owner);
        console2.log("total collections : ",totalCollections);
        address[] memory collectionAddresses =erc721Collection.getCollections(owner);
        for(uint i=0;i<collectionAddresses.length;++i){
            console2.log("collection ",i," address : ",collectionAddresses[i]);
        }
        address collectionAddress = collectionAddresses[0];
        erc721Collection.mintNFT(owner,collectionAddress);
        erc721Collection.mintNFT(owner,collectionAddress);
        erc721Collection.mintNFT(owner,collectionAddress);
        vm.stopPrank();

        assertEq(IERC721(collectionAddress).ownerOf(0), address(owner));
        assertEq(IERC721(collectionAddress).ownerOf(1), address(owner));
        assertEq(IERC721(collectionAddress).ownerOf(2), address(owner));

    }
    function test_checkMintNFTForUser() public {
        address user = makeAddr("user");
        vm.startPrank(user);
        uint256 totalCollections = erc721Collection.getTotalCollections(owner);
        console2.log("total collections : ",totalCollections);
        address[] memory collectionAddresses =erc721Collection.getCollections(owner);
        for(uint i=0;i<collectionAddresses.length;++i){
            console2.log("collection ",i," address : ",collectionAddresses[i]);
        }
        address collectionAddress = collectionAddresses[0];
        erc721Collection.mintNFT(owner,collectionAddress);
        erc721Collection.mintNFT(owner,collectionAddress);
        erc721Collection.mintNFT(owner,collectionAddress);
        vm.stopPrank();

        assertEq(IERC721(collectionAddress).ownerOf(0), address(user));
        assertEq(IERC721(collectionAddress).ownerOf(1), address(user));
        assertEq(IERC721(collectionAddress).ownerOf(2), address(user));

    }
}
