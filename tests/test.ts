import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

import { interval } from 'rxjs'
import { Position } from 'unist'

import { TestCase, content } from './_test'

promisify(fs.readFile)

/**
 * @deprecated
 */
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

// eslint-disable-next-line sonar/deprecation -- this is expected
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

/**
 * unexpected on ts 4.2, related to:
 * @link https://github.com/ReactiveX/rxjs/issues/6060
 * @link https://community.sonarsource.com/t/unexpected-deprecation-warnings-reported/39441
 */
interval(1000).subscribe()

new TestCase<number>().subscribe()
