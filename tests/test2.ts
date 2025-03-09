import fs from 'node:fs'
import path from 'node:path'
import { promisify } from 'node:util'

import { interval } from 'rxjs'
import type { Position } from 'unist'

// eslint-disable-next-line sonarjs/deprecation -- testing
import { content, TestCase } from './_test'

promisify(fs.readFile)

/**
 * @deprecated
 */
class Basic {
  // eslint-disable-next-line sonarjs/deprecation -- testing
  prop: string = content
}

const decorator: ClassDecorator = () => {
  //
}

@decorator
export class Empty {}

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
        // eslint-disable-next-line sonarjs/no-nested-functions -- testing
        foo(() => {
          // Do something
        })
      })
    })
  })
})

const obj: Record<string, string | undefined> = {}

// eslint-disable-next-line sonarjs/deprecation -- testing
export default class Test extends Basic implements X {
  path: typeof path

  readonly m = 0

  name: {
    key: string
    value?: string
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

interval(1000).subscribe()

new TestCase<number>().subscribe()

// eslint-disable-next-line no-restricted-syntax, sonarjs/redundant-type-aliases
export type A = number
// eslint-disable-next-line no-restricted-syntax, sonarjs/redundant-type-aliases
export type B = A
export type C = readonly number[]
export type D = readonly number[]
// eslint-disable-next-line @typescript-eslint/no-duplicate-type-constituents
export type E = A | B
export type F = number[]
export type G = NodeJS.Immediate
