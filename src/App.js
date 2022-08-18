import React, { useEffect, useState } from 'react'
import { Box } from './elements/Box'
import Main from './pages/Main'

const App = () => {
  const CLIENT_ID = '21e84a86e60faf11f9b7'
  const REDIRECT_URI = 'http://localhost:3000/'
  const token = localStorage.getItem('token')

  const [isToken, stIsToken] = useState(Boolean(token))

  useEffect(() => {
    const code =
      window.location.href.match(/\?code=(.*)/) &&
      window.location.href.match(/\?code=(.*)/)[1]
    if (code) {
      fetch(`http://localhost:9999/authenticate/${code}`)
        .then(response => response.json())
        .then(({ token }) => {
          if (token) {
            localStorage.setItem('token', token)
            stIsToken(true)
          }
        })
    }
  }, [])

  return (
    <Box justify="center" align="center" width="100%" direction="column">
      {isToken ? (
        <Main />
      ) : (
        <a
          href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
        >
          login
        </a>
      )}
    </Box>
  )
}

export default App
