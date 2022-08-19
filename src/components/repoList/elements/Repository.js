import React from 'react'
import { Box, Text } from '../../../elements'

const Repository = ({ item, setActiveIssues }) => {
  const {
    name,
    watchers: { totalCount: totalWatching },
    stargazers: { totalCount: totalStars },
  } = item

  return (
    <Box
      with="100%"
      margin="0 0 0 -5px"
      padding="10px 5px"
      justify="space-between"
      backgroundHover="lightgrey"
      cursor="pointer"
      onClick={() => setActiveIssues(name)}
    >
      <Text fontSize="18px">{name}</Text>

      <Box align="center">
        <Text color="grey" fontSize="18px">
          {totalStars} Stars
        </Text>
        <Box width="2px" height="2px" background="grey" margin="0 6px" />
        <Text color="grey" fontSize="18px">
          {totalWatching} Watching
        </Text>
      </Box>
    </Box>
  )
}

export default Repository
