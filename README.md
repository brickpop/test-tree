# Test tree

Test tree allows you to define test outcomes in YAML and get visual tree representations for technical and non technical people. This tool is very useful for reasonably complex projects where keeping track of all the features and edge cases by just reading the code becomes unviable.

Use the generated `*.tree` files to generate solidity test placeholders using [bulloak](https://github.com/alexfertel/bulloak).

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

Then, pipe its contents to `test-tree`:

### Using the script locally

```sh
$ cat example/my-contract.t.yaml | deno run main.ts
```

### Running the script remotely

```sh
$ cat example/my-contract.t.yaml | deno run https://raw.githubusercontent.com/brickpop/test-tree/refs/heads/main/main.ts
```

### Using a compiled binary

```sh
$ deno compile https://raw.githubusercontent.com/brickpop/test-tree/refs/heads/main/main.ts
$ cat example/my-contract.t.yaml | ./test-tree
```

The final output will look like a human readable tree:

```
# MyTest.tree

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

## Using the Makefile to automate the whole flow

Copy [Makefile](./Makefile) to your Foundry project:

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

## Example project

See [example-project](./example-project/) for a working example.
