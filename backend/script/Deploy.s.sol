// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {Script} from "forge-std/Script.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {CustomNFT} from "../src/CustomNFT.sol";
import {ERC721Collection} from "../src/ERC721Collection.sol";
import {IERC721} from "@openzeppelin/contracts/interfaces/IERC721.sol";
import {console2} from "forge-std/console2.sol";

contract PolyNFTScript is Script {
    address user = makeAddr("user");
    ERC721Collection erc721Collection;

    function run() public {
        HelperConfig helperConfig = new HelperConfig();

        (uint256 deployerKey) = helperConfig.activeNetworkConfig();
        vm.startBroadcast(deployerKey);
        erc721Collection = new ERC721Collection();
        console2.log("erc721collection deployed at : ",address(erc721Collection));
        vm.stopBroadcast();

    }

   
}