# text-testing monorepo

text-testing monorepo.

## What is this?

It is testing library for texts.

You can use [text-testing-mocha](./packages/text-testing-mocha) for testing texts.
For example, you want to test that "What is this?" section should contain "It is".
You can write the test using [text-testing-mocha](./packages/text-testing-mocha) by following code.


`readme-test.js`:
```js
const tester = require("text-testing-mocha");
const fs = require("fs");
const content = fs.readFileSync("README.md", "utf-8");
tester(content, (section) => {
    section("What is this?", (test) => {
        test("testing library");
    });
});
```

Run the test via [Mocha](http://mochajs.org/ "Mocha").

```
$ mocha readme-test.js

  What is this?
    ✓ testing library
```

## Packages

### [text-testing](./packages/text-testing)

Assertion library for natural language.

### [text-testing-mocha](./packages/text-testing-mocha)

Testing library that using [text-testing](./packages/text-testing) for Mocha.

### [select-section](./packages/select-section)

Create "Section" node from [TxtAST](https://github.com/textlint/textlint/blob/master/docs/txtnode.md "TxtAST").

## Changelog

See [Releases page](https://github.com/azu/text-testing-mocha/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/text-testing-mocha/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
