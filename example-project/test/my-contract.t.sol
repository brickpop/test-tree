// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {Test} from "forge-std/Test.sol";

contract MultisigTest is Test {
    modifier givenProposalExists() {
        _;
    }

    modifier givenProposalIsInTheLastStage() {
        _;
    }

    function test_WhenProposalCanAdvance() external givenProposalExists givenProposalIsInTheLastStage {
        // It Should return true
        vm.skip(true);
    }

    function test_WhenProposalCannotAdvance() external givenProposalExists givenProposalIsInTheLastStage {
        // It Should return false
        vm.skip(true);
    }

    function test_WhenProposalIsNotInTheLastStage() external givenProposalExists {
        // It should do A
        // It should do B
        // It should do C
        vm.skip(true);
    }

    function test_RevertWhen_ProposalDoesntExist() external {
        // It should revert
        vm.skip(true);
    }
}
