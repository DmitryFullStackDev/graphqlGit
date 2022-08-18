import React from 'react'
import { Input } from '../elements'

const Search = ({ value, setValue, setIsSearch }) => {
  return (
    <Input
      placeholder="Search users..."
      value={value}
      onChange={e => {
        setValue(e.target.value)
        setIsSearch(false)
      }}
    />
  )
}

export default Search
