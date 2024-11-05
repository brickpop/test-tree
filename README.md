# Test tree

A simple script to describe tests in YAML and get visual tree representations as well as solicity test placeholders using [bulloak](https://github.com/alexfertel/bulloak).

## Usage

Tests can be described using yaml files. They will be automatically transformed into solidity test files with [bulloak](https://github.com/alexfertel/bulloak).

Create a file with `.t.yaml` extension within the `test` folder and describe a hierarchy of test cases:

```yaml
# MyTest.t.yaml

MultisigTest:
- given: proposal exists
  comment: Comment here
  and: 
  - given: proposal is in the last stage
    and:

    - when: proposal can advance
      then:
      - it: Should return true

    - when: proposal cannot advance
      then:
      - it: Should return false

  - when: proposal is not in the last stage
    then:
    - it: should do A
      comment: This is an important remark
    - it: should do B
    - it: should do C

- when: proposal doesn't exist
  comment: Testing edge cases here
  then:
  - it: should revert
```

## Generate a tree file

```sh
$ cat example/my-contract.t.yaml | deno run main.ts
# or
$ cat example/my-contract.t.yaml | deno run https://raw.githubusercontent.com/brickpop/test-tree/refs/heads/main/main.ts
```

Or using a locally compiled binary

```sh
$ deno compile "https://raw.githubusercontent.com/brickpop/test-tree/refs/heads/main/main.ts"
$ cat example/my-contract.t.yaml | ./test-tree
```

Then, pipe its contents to `test-tree`:

```sh
$ cat example/my-contract.t.yaml | deno run main.ts
```

The final output will look like a human readable tree:

```
# MyTest.tree

EmergencyMultisigTest
├── Given proposal exists // Comment here
│   ├── Given proposal is in the last stage
│   │   ├── When proposal can advance
│   │   │   └── It Should return true
│   │   └── When proposal cannot advance
│   │       └── It Should return false
│   └── When proposal is not in the last stage
│       ├── It should do A // Careful here
│       ├── It should do B
│       └── It should do C
└── When proposal doesn't exist // Testing edge cases here
    └── It should revert
```

## Using the Makefile for a simpler flow

Copy [Makefile](./Makefile) to your code:

```sh
curl "https://raw.githubusercontent.com/brickpop/test-tree/refs/heads/main/Makefile" > Makefile
```

Then use `make` to automatically sync the described branches into solidity test files.

```sh
$ make
Available targets:
- make all         Builds all tree files and updates the test tree markdown
- make sync        Scaffold or sync tree files into solidity tests
- make check       Checks if solidity files are out of sync
- make markdown    Generates a markdown file with the test definitions rendered as a tree
- make test-tree   Compile the tree generator as a local binary
- make init        Check the dependencies and prompt to install if needed
- make clean       Clean the intermediary tree files
```
