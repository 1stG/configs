import React, { useState } from 'react'

export default class Test extends React.PureComponent {
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
