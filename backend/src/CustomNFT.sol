// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract CustomNFT is ERC721URIStorage, Ownable {
    uint256 internal tokenId;
    string TOKEN_URI;

    constructor(string memory name,string memory symbol,string memory _tokenURI) ERC721(name, symbol) Ownable(msg.sender) {
        TOKEN_URI=_tokenURI;
        // test image location ipfs : "https://ipfs.io/ipfs/QmTxEyXaehnU3MMzRB2Coazobvc3fQUtCpsdX49i9R2Qa7"
        /*
        metadata for uri
        

            {
                "name": "Thor's hammer",
                "description": "Mjölnir, the legendary hammer of the Norse god of thunder.",
                "image": "https://ipfs.io/ipfs/QmTxEyXaehnU3MMzRB2Coazobvc3fQUtCpsdX49i9R2Qa7",
                "strength": 20
            }


        */
    }

    function mint(address to) public onlyOwner {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, TOKEN_URI);
        tokenId++;
    }

    function getCurrentTokenId() public view returns (uint256) {
        return tokenId;
    }
}
