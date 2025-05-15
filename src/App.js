import React, { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import Main from './pages/Main'
import CircularProgress from '@mui/material/CircularProgress';

const App = () => {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
  const REDIRECT_URI = window.location.origin
  const token = localStorage.getItem('token')

  const [isToken, setIsToken] = useState(Boolean(token))
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const code =
      window.location.href.match(/\?code=(.*)/) &&
      window.location.href.match(/\?code=(.*)/)[1]

    if (code) {
      setIsLoading(true)
      fetch(`https://git-o-auth.vercel.app/authenticate/${code}`)
        .then(response => response.json())
        .then(({ token }) => {
          if (token) {
            localStorage.setItem('token', token)
            setIsToken(true)
          }
        }).finally(() => setIsLoading(false))
    }
  }, [])

  if (isLoading) {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
    );
  }

  return (
      <>
      {isToken ? (
          <Box justify="center" align="center" width="100%" height='100vh'>
            <Main />
          </Box>
      ) : (
          <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
              height="100vh"
          >
              <Button sx={{alignSelf: 'center'}} variant='contained' onClick={() => window.open(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=public_repo&redirect_uri=${REDIRECT_URI}`)}>
                Login via GitHub
              </Button>
          </Box>
      )}
    </>
  )
}

export default App
