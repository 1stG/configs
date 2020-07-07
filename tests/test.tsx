import React, { useState } from 'react'

export default class Test extends React.PureComponent {
  static a = 1

  b?: string

  render() {
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
