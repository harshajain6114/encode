// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import {RandomnessReceiverBase} from "randomness-solidity/src/RandomnessReceiverBase.sol";

contract CorgiDNAGenerator is RandomnessReceiverBase {
    bytes32 public corgiDNA;
    uint256 public requestId;

    constructor(address randomnessSender) RandomnessReceiverBase(randomnessSender) {}

    // Start DNA generation request
    function generateCorgiDNA() external {
        requestId = requestRandomness();
    }

    // This will be called automatically when randomness is received
    function onRandomnessReceived(uint256 requestID, bytes32 _randomness) internal override {
        require(requestId == requestID, "Request ID mismatch");
        corgiDNA = _randomness;
    }
}
