
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {Script} from "forge-std/Script.sol";
import {CustomNFT} from "../src/CustomNFT.sol";
import {ERC721Collection} from "../src/ERC721Collection.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {console} from "forge-std/console.sol";
import {IERC721Metadata} from "@openzeppelin/contracts/interfaces/IERC721Metadata.sol";

contract MintFromCollection is Script {


    function run() public {
        HelperConfig helperConfig = new HelperConfig();
        (uint256 deployerKey) = helperConfig.activeNetworkConfig();
        ERC721Collection erc721Collection= ERC721Collection(address(0xC4a32c2bD650492FCC3f838E57c484B33E016732)); // optimism sepolia collection address
        address deployer = address(uint160(deployerKey));
        vm.startBroadcast(deployerKey);
        // erc721Collection.createCollection("MyPFPCollection","MyPFP","ipfs://QmSr3FYVuADykPVc9q1m5WGyzoMYsWJcpnRxATNn1muQVV");
        
       
        ERC721Collection(erc721Collection).mintNFT(address(0xf611447EE2116b3146c47B73711a5c80819277cD),
            address(0x7c235463E463df5056342F1971a039641c76340A)
        );
        vm.stopBroadcast();
        // console.log("nft minted from collection 0 : ",collectionAddress);
    
    }
}
