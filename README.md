# json-format-tool

[![npm module](https://badge.fury.io/js/json-format-tool.svg)](https://www.npmjs.com/package/json-format-tool)
[![Build Status](https://travis-ci.org/jinghua000/json-format-tool.svg?branch=master)](https://travis-ci.org/jinghua000/json-format-tool)

## Introduction

Okay, this is a tiny cli-tool for format JSON.

## Usage

First install

```bash
npm i -g json-format-tool
```

And if we have a not pretty JSON file like this one.

```json
  {
  "foo": "foo",
   "bar": { "x": "我", "z": 234, "y": 345 },
    "baz": [3, 2, { "b": 234, "a": 123 }]
 }
```

We can format it.

```bash
json-format-tool demo.json
```

It will output

```json
{
  "bar": {
    "x": "我",
    "y": 345,
    "z": 234
  },
  "baz": [
    3,
    2,
    {
      "a": 123,
      "b": 234
    }
  ],
  "foo": "foo"
}
```

It's much pretty now.

And if you want format some mutable JSON such as HTTP request, 
you can use the pipe operator.

```bash
curl -X GET http://127.0.0.1:3000/my-api | json-format-tool
```

Other options you can check inside the cli tool.

```bash
json-format-tool -h
```

```
Usage: json-format-tool [options] <json-file> OR <output-json> | json-format-tool

Options:
  -v, --version       output the version number
  -r, --replace       replace the file directly, only works in <json-file> mode
  -i, --indent <num>  indent for json (default: 2)
  --no-sort           not need sort keys
  -h, --help          output usage information
```

## Internal

Sort JSON keys based on [json-stable-stringify](https://www.npmjs.com/package/json-stable-stringify).