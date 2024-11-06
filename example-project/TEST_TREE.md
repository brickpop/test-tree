# Test tree definitions

Below is the graphical definition of the contract tests implemented on [the test folder](./test)

```
MultisigTest
├── Given proposal exists // Comment here
│   ├── Given proposal is in the last stage
│   │   ├── When proposal can advance
│   │   │   └── It Should return true
│   │   └── When proposal cannot advance
│   │       └── It Should return false
│   └── When proposal is not in the last stage
│       ├── It should do A // This is an important remark
│       ├── It should do B
│       └── It should do C
└── When proposal doesnt exist // Testing edge cases here
    └── It should revert
```

