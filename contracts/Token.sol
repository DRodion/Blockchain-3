// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract lab2 is ERC20 {
	struct StructData {
        bool x1;
        int x2;
        address x3;
        uint32 x4;
    }
	
	StructData[] arr;

    function setStruct (StructData memory data) internal {
        arr.push(data);
    }

    function revealStructFromArray(uint idx)
        external
        view
        returns (StructData memory)
    {
        return arr[idx];
    }

    function revealArray() external view returns (StructData[] memory) {
        return arr;
    }

    constructor(uint256 initialSupply) ERC20("lab2", "TSL") {
        _mint(msg.sender, initialSupply);
    }
}

