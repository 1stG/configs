import fs from 'node:fs'
import path from 'node:path'
import { promisify } from 'node:util'

promisify(fs.readFile)

class Basic {}

function* generator() {
  yield '44'
  yield '55'
}

async function bar() {
  return 1
}

function foo(cb1) {
  cb1(false)
  bar()
}

foo(function () {
  foo(function () {
    foo(function () {
      foo(function () {
        // eslint-disable-next-line sonarjs/no-nested-functions -- testing
        foo(function () {
          // Do something
        })
      })
    })
  })
})

const obj = {}

export default class Test extends Basic {
  constructor() {
    super()
    this.path = path
    this.name = { key: 'key', value: obj.value }
    generator()
  }
}

try {
  const y = obj?.x ?? 1
  console.log(y)
} catch {}
