import { PureComponent, useState } from 'react'

export default class Test extends PureComponent {
  static readonly a = 1

  // eslint-disable-next-line @eslint-react/no-unused-class-component-members -- testing
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
