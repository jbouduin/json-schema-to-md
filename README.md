# @jbouduin/json-schema-to-md

Documenting and validating complex JSON Schemas can be hard. This tool makes it easier by providing a number of scripts that can turn JSON Schema files into readable Markdown documentation that is ready for consumption on GitHub or Azure DevOps.

[![Travis (.org)](https://img.shields.io/travis/jbouduin/json-schema-to-md)](https://travis-ci.org/github/jbouduin/holiday)
[![Coverage Status](https://coveralls.io/repos/github/jbouduin/json-schema-to-md/badge.svg?branch=master)](https://coveralls.io/github/jbouduin/json-schema-to-md?branch=master)
[![Open issues](https://img.shields.io/github/issues/jbouduin/holiday)](https://github.com/jbouduin/json-schema-to-md/issues)
[![license](https://img.shields.io/github/license/jbouduin/holiday)](/LICENSE)

## Requirements

- `npm` version 3.10.8 or up
- `node` v10 or up

## Installing and running

```bash
$ npm install -g @jbouduin/json-schema-to-md

# show usage information
$ @jbouduin/json-schema-to-md

# run task
$ @jbouduin/json-schema-to-md -d examples/schemas -o examples/docs
# generated output for whole folder is written to ./examples/docs
```

## Using JSON Schema Markdown Tools from `npm`

You can conveniently use the JSON Schema Markdown Tools from `npm`. This makes it possible to set up a conversion toolchain for your JSON Schema project that is driven entirely by `npm`. To do so, first define the dependency by adding this to your `"devDependencies"` section of `package.json`

```json
  "devDependencies": {
    "@jbouduin/json-schema-to-md": "^0.0.1"
  }
```

Then add the following to the `"scripts"` section of your `package.json` and adapt accordingly:

```json
"scripts": {
  "prepare": "mkdir -p docs/reference && json-schema-to-md -o docs/reference -d schemas/draft-04"
}
```

If you run `npm install` before running `npm run prepare`, `npm` will install the `@jbouduin/json-schema-to-md` in a `node_modules/.bin` path, even if you did not install the JSON Schema Markdown beforehand.

## Tests

Ensure you have all the dependencies installed via `npm install`, then run:

```bash
npm run test
```

### Code Coverage

`npm run test-coverage` will generate a code coverage report at the end of the test run. Anything below 100% coverage counts as a test failure.

## Style Guide / Linting

This project uses [eslint](https://eslint.org) to enforce JavaScript coding style. To run the linter:

```bash
npm run lint
```

## Contributing

Please see [Contributing.md](Contributing.md) for details. Pull requests are welcome.