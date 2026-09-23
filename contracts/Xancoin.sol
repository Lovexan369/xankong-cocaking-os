// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Xancoin
 * @author Dmitry Koval
 * @notice Utility token for XanKong Cocaking OS ecosystem
 */
contract Xancoin is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10 ** 18; // 1 billion

    constructor() ERC20("Xancoin", "XAN") Ownable(msg.sender) {
        _mint(msg.sender, MAX_SUPPLY);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Max supply exceeded");
        _mint(to, amount);
    }

    event FeatureEvolved(string feature, uint256 timestamp);

    function evolve(string memory feature) external onlyOwner {
        emit FeatureEvolved(feature, block.timestamp);
    }
}
