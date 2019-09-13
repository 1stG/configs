import fs from 'fs'
import path from 'path'
import { Position } from 'unist'
import { promisify } from 'util'

import { content } from './_test'

promisify(fs.readFile)

class Basic {
  prop: string = content
}

interface X {
  m: number
  p?: Position
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

foo(() => {
  foo(() => {
    foo(() => {
      foo(() => {
        foo(() => {
          // Do something
        })
      })
    })
  })
})

const obj: Record<string, string | undefined> = {}

// tslint:disable-next-line: max-classes-per-file
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
  // tslint:disable-next-line: no-console
  console.log(y)
} catch {
  //
}
