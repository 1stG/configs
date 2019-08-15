import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

promisify(fs.readFile)

class Basic {
  prop!: string
}

interface X {
  m: number
}

function* generator() {
  yield '44'
  yield '55'
}

function bar(_a: string) {
  //
}

function foo(cb1: (p: boolean) => void) {
  cb1(false)
  bar('')
}

foo(function() {
  foo(function() {
    foo(function() {
      foo(function() {
        foo(function() {
          // Do something
        })
      })
    })
  })
})

const obj: Record<string, string | undefined> = {}

export default class Test extends Basic implements X {
  path: typeof path

  m = 0

  name: {
    key: string
    value: string | undefined
  }

  constructor() {
    super()
    this.path = path
    this.name = { key: 'key', value: obj.value }
    generator()
  }
}

try {
  const y = obj.x
  console.log(y)
} catch {}
