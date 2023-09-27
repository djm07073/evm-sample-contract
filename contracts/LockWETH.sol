// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;
import "./interfaces/IWETH9.sol";

contract LockWETH {
    IWETH9 immutable weth;

    constructor(IWETH9 _weth) {
        weth = _weth;
    }

    function lock(uint amount) public {
        weth.transferFrom(msg.sender, address(this), amount);
    }
}
