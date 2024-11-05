import { assertEquals } from "@std/assert";
import { renderAsMarkdown } from "./tree-render.ts";

Deno.test(function parseTest() {
  const tree = {
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
  };

  const expected = `MyContractTest
├── Given a newly deployed contract
│   └── Given calling initialize
│       ├── It should initialize the first time
│       ├── It should refuse to initialize again
│       ├── It should set the DAO address
│       ├── It should set the minApprovals
│       ├── It should set onlyListed
│       ├── It should set signerList
│       ├── It should set destinationProposalDuration
│       ├── It should set proposalExpirationPeriod
│       ├── It should emit MultisigSettingsUpdated
│       ├── When minApprovals is greater than signerList length on initialize
│       │   ├── It should revert
│       │   ├── It should revert (with onlyListed false)
│       │   └── It should not revert otherwise
│       ├── When minApprovals is zero on initialize
│       │   ├── It should revert
│       │   ├── It should revert (with onlyListed false)
│       │   └── It should not revert otherwise
│       └── When signerList is invalid on initialize
│           └── It should revert
├── When calling upgradeTo
│   ├── It should revert when called without the permission
│   └── It should work when called with the permission
└── When calling upgradeToAndCall
    ├── It should revert when called without the permission
    └── It should work when called with the permission
`;

  assertEquals(renderAsMarkdown(tree), expected);
});
