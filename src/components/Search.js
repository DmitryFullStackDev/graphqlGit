import React from 'react'
import { Input } from '../elements'

const Search = ({ value, setValue, dismissFunc }) => {
  return (
    <Input
      placeholder="Search users..."
      value={value}
      borderRight="none"
      onChange={e => {
        setValue(e.target.value)
        dismissFunc()
      }}
    />
  )
}

export default Search
