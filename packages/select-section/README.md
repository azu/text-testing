# select-section

Cut out sections from TxtAST.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install select-section

## Usage

```js
const AST = remark.parse(`# Header
text1
text1

# Header

text2
text2`);
const results = createSections(AST);
/*
[
    [
        {
            "type": "heading",
            "depth": 1,
            "children": [
                {
                    "type": "text",
                    "value": "Header",
                    "position": {
                        "start": {
                            "line": 1,
                            "column": 3,
                            "offset": 2
                        },
                        "end": {
                            "line": 1,
                            "column": 9,
                            "offset": 8
                        },
                        "indent": []
                    }
                }
            ],
            "position": {
                "start": {
                    "line": 1,
                    "column": 1,
                    "offset": 0
                },
                "end": {
                    "line": 1,
                    "column": 9,
                    "offset": 8
                },
                "indent": []
            }
        },
        {
            "type": "paragraph",
            "children": [
                {
                    "type": "text",
                    "value": "text1\ntext1",
                    "position": {
                        "start": {
                            "line": 2,
                            "column": 1,
                            "offset": 9
                        },
                        "end": {
                            "line": 3,
                            "column": 6,
                            "offset": 20
                        },
                        "indent": [
                            1
                        ]
                    }
                }
            ],
            "position": {
                "start": {
                    "line": 2,
                    "column": 1,
                    "offset": 9
                },
                "end": {
                    "line": 3,
                    "column": 6,
                    "offset": 20
                },
                "indent": [
                    1
                ]
            }
        }
    ],
    [
        {
            "type": "heading",
            "depth": 1,
            "children": [
                {
                    "type": "text",
                    "value": "Header",
                    "position": {
                        "start": {
                            "line": 5,
                            "column": 3,
                            "offset": 24
                        },
                        "end": {
                            "line": 5,
                            "column": 9,
                            "offset": 30
                        },
                        "indent": []
                    }
                }
            ],
            "position": {
                "start": {
                    "line": 5,
                    "column": 1,
                    "offset": 22
                },
                "end": {
                    "line": 5,
                    "column": 9,
                    "offset": 30
                },
                "indent": []
            }
        },
        {
            "type": "paragraph",
            "children": [
                {
                    "type": "text",
                    "value": "text2\ntext2",
                    "position": {
                        "start": {
                            "line": 7,
                            "column": 1,
                            "offset": 32
                        },
                        "end": {
                            "line": 8,
                            "column": 6,
                            "offset": 43
                        },
                        "indent": [
                            1
                        ]
                    }
                }
            ],
            "position": {
                "start": {
                    "line": 7,
                    "column": 1,
                    "offset": 32
                },
                "end": {
                    "line": 8,
                    "column": 6,
                    "offset": 43
                },
                "indent": [
                    1
                ]
            }
        }
    ]
]
*/
```

## Changelog

See [Releases page](https://github.com/azu/select-section/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/select-section/issues).

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
