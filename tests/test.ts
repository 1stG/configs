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

export default class Test extends Basic implements X {
  path: typeof path

  readonly m = 0

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
