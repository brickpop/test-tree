import { assertObjectMatch } from "@std/assert";
import { parseDefinition } from "./parsing.ts";

Deno.test(function parseTest() {
  const definition = `MyContractTest:
  # Comments are allowed
  - given: a newly deployed contract
    then:
      - given: calling initialize
        then:
          - it: should initialize the first time
          - it: should refuse to initialize again
          - it: should set the DAO address
          - it: should set the minApprovals
          - it: should set onlyListed
          - it: should set signerList
          - it: should set destinationProposalDuration
          - it: should set proposalExpirationPeriod
          - it: should emit MultisigSettingsUpdated
          - when: minApprovals is greater than signerList length [on initialize]
            then:
              - it: should revert
              - it: should revert (with onlyListed false)
              - it: should not revert otherwise
          - when: minApprovals is zero [on initialize]
            then:
              - it: should revert
              - it: should revert (with onlyListed false)
              - it: should not revert otherwise
          - when: signerList is invalid [on initialize]
            then:
              - it: should revert

  - when: calling upgradeTo
    then:
      - it: should revert when called without the permission
      - it: should work when called with the permission

  - when: calling upgradeToAndCall
    then:
      - it: should revert when called without the permission
      - it: should work when called with the permission
`;

  assertObjectMatch(parseDefinition(definition), {
    content: "MyContractTest",
    children: [
      {
        content: "Given a newly deployed contract",
        children: [
          {
            content: "Given calling initialize",
            children: [
              { content: "It should initialize the first time", children: [] },
              { content: "It should refuse to initialize again", children: [] },
              { content: "It should set the DAO address", children: [] },
              { content: "It should set the minApprovals", children: [] },
              { content: "It should set onlyListed", children: [] },
              { content: "It should set signerList", children: [] },
              {
                content: "It should set destinationProposalDuration",
                children: [],
              },
              {
                content: "It should set proposalExpirationPeriod",
                children: [],
              },
              {
                content: "It should emit MultisigSettingsUpdated",
                children: [],
              },
              {
                content:
                  "When minApprovals is greater than signerList length on initialize",
                children: [
                  { content: "It should revert", children: [] },
                  {
                    content: "It should revert (with onlyListed false)",
                    children: [],
                  },
                  { content: "It should not revert otherwise", children: [] },
                ],
              },
              {
                content: "When minApprovals is zero on initialize",
                children: [
                  { content: "It should revert", children: [] },
                  {
                    content: "It should revert (with onlyListed false)",
                    children: [],
                  },
                  { content: "It should not revert otherwise", children: [] },
                ],
              },
              {
                content: "When signerList is invalid on initialize",
                children: [{ content: "It should revert", children: [] }],
              },
            ],
          },
        ],
      },
      {
        content: "When calling upgradeTo",
        children: [
          {
            content: "It should revert when called without the permission",
            children: [],
          },
          {
            content: "It should work when called with the permission",
            children: [],
          },
        ],
      },
      {
        content: "When calling upgradeToAndCall",
        children: [
          {
            content: "It should revert when called without the permission",
            children: [],
          },
          {
            content: "It should work when called with the permission",
            children: [],
          },
        ],
      },
    ],
  });
});
