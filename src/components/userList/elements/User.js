import React, {useState} from 'react'
import {Box, Paper, Typography} from '@mui/material'

const User = ({item, setActiveLogin, activeLogin}) => {
    const [isShown, setIsShown] = useState(true)

    const {
        avatarUrl,
        name,
        repositories: {totalCount},
        login,
    } = item

    return (
        <Box
            sx={{
                pb: 1,
                borderBottom: activeLogin === login ? '1px solid blue' : 'none',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: '200px',
                    height: '200px',
                    backgroundColor: 'black',
                    backgroundImage: `url(${avatarUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    margin: '5px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    '&:hover': {
                        filter: 'brightness(1.1)',
                    },
                }}
                onMouseEnter={() => setIsShown(false)}
                onMouseLeave={() => setIsShown(true)}
                onClick={() => setActiveLogin(login)}
            >
                {isShown && (
                    <Box
                        sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            width: "150px",
                            padding: '8px 12px',
                            borderRadius: '8px',
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h6" color="white">
                            {name}
                        </Typography>
                        <Typography variant="body2" sx={{color: 'lightgray', mt: 1}}>
                            {totalCount} Repositories
                        </Typography>
                    </Box>
                )}
            </Paper>
        </Box>
    )
}

export default User
