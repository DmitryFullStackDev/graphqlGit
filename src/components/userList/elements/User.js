import React, { useState } from 'react'
import { Box, Text } from '../../../elements'

const User = ({ item, setActiveLogin, activeLogin }) => {
  const [isShown, setIsShown] = useState(true)

  const {
    avatarUrl,
    name,
    repositories: { totalCount },
    login,
  } = item

  return (
    <Box
      padding="0 0 10px 0"
      borderBottom={activeLogin === login ? '1px solid blue' : 'none'}
    >
      <Box
        minWidth="150px"
        height="120px"
        background="black"
        img={avatarUrl}
        margin="5px"
        align="center"
        justify="center"
        direction="column"
        padding="25px"
        onMouseEnter={() => setIsShown(false)}
        onMouseLeave={() => setIsShown(true)}
        onClick={() => setActiveLogin(login)}
        cursor="pointer"
      >
        {isShown && (
          <>
            <Text textAlign="center" fontSize="20px" color="white">
              {name}
            </Text>

            <Text fontSize="16px" color="darkgrey" margin="15px 0 0 0">
              {totalCount + ' Repositories'}
            </Text>
          </>
        )}
      </Box>
    </Box>
  )
}

export default User
