import React from 'react'
import {Box, Typography} from '@mui/material'

const Repository = ({item, setActiveIssues}) => {
    const {
        name,
        watchers: {totalCount: totalWatching},
        stargazers: {totalCount: totalStars},
    } = item

    return (
        <Box
            sx={{
                width: '100%',
                margin: '0 0 0 -5px',
                padding: '10px 5px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: 'lightgrey',
                },
            }}
            onClick={() => setActiveIssues(name)}
        >
            <Typography sx={{fontSize: '18px'}}>{name}</Typography>

            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Typography sx={{color: 'grey', fontSize: '18px'}}>
                    {totalStars} Stars
                </Typography>
                <Box
                    sx={{
                        width: '2px',
                        height: '2px',
                        backgroundColor: 'grey',
                        margin: '0 6px',
                        borderRadius: '50%',
                    }}
                />
                <Typography sx={{color: 'grey', fontSize: '18px'}}>
                    {totalWatching} Watching
                </Typography>
            </Box>
        </Box>
    )
}

export default Repository
