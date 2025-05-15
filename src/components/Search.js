import React from 'react'
import TextField from '@mui/material/TextField'

const Search = ({ value, setValue, dismissFunc }) => {
    return (
        <TextField
            fullWidth
            variant="outlined"
            placeholder="Search users..."
            value={value}
            onChange={(e) => {
                setValue(e.target.value)
                dismissFunc()
            }}
            inputProps={{
                style: { height: 35, padding: '0 8px' }
            }}
        />
    )
}

export default Search
