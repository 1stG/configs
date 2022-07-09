import { PureComponent, useState } from 'react'

export default class Test extends PureComponent {
  static a = 1

  b?: string

  override render() {
    return <div>Hello</div>
  }
}

export const useInput = () => {
  const [value, setValue] = useState('')
  return (
    <input
      type="text"
      value={value}
      onChange={e => setValue(e.currentTarget.value)}
    />
  )
}
