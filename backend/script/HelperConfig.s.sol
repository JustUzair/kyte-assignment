// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;


import {Script} from "forge-std/Script.sol";

contract HelperConfig is Script {
    struct NetworkConfig {
        uint256 deployerKey;
    }

    NetworkConfig public activeNetworkConfig;
    uint256 public DEFAULT_ANVIL_PRIVATE_KEY = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;

    constructor() {
        if (block.chainid == 11155111) {
            activeNetworkConfig = getOrCreateAnvilConfig();
        } 
        else if (block.chainid == 80001) {
            activeNetworkConfig = getPolygonMumbaiConfig();
        } else if (block.chainid == 11155420) {
            activeNetworkConfig = getOptimismSepoliaConfig();
        } else if (block.chainid == 84532) {
            activeNetworkConfig = getBaseSepoliaConfig();
        }
    }

    function getPolygonMumbaiConfig() public view returns (NetworkConfig memory polygonMumbaiNetworkConfig) {
        polygonMumbaiNetworkConfig = NetworkConfig({
            deployerKey: vm.envUint("PRIVATE_KEY")
        
        });
    }

    function getOptimismSepoliaConfig() public view returns (NetworkConfig memory optimismSepoliaConfig) {
        optimismSepoliaConfig = NetworkConfig({
            deployerKey: vm.envUint("PRIVATE_KEY")
           
        });
    }

    function getBaseSepoliaConfig() public view returns (NetworkConfig memory baseSepoliaConfig) {
        baseSepoliaConfig = NetworkConfig({
            deployerKey: vm.envUint("PRIVATE_KEY")
        
        });
    }
    function getOrCreateAnvilConfig() public view returns (NetworkConfig memory) {
        return NetworkConfig({deployerKey: DEFAULT_ANVIL_PRIVATE_KEY});
    }

}