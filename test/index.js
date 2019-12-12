const { strictEqual } = require('assert')
const { format } = require('../lib')
const DEMO_JSON = '  {"b":123,"c": ["c","a","b"],  "a":234  }'

describe('test json formatter', () => {

  it('default formatter should sort keys with 2 indent', () => {

    strictEqual(
      format(DEMO_JSON), 
`{
  "a": 234,
  "b": 123,
  "c": [
    "c",
    "a",
    "b"
  ]
}`    
    )

  })

  it('indent can be changed', () => {

    strictEqual(
      format(DEMO_JSON, { indent: 3 }), 
`{
   "a": 234,
   "b": 123,
   "c": [
      "c",
      "a",
      "b"
   ]
}`    
    )

  })

  it('if sort set false will not sort keys', () => {

    strictEqual(
      format(DEMO_JSON, { sort: false }), 
`{
  "b": 123,
  "c": [
    "c",
    "a",
    "b"
  ],
  "a": 234
}`    
    )

  })

})