import React from 'react'
import { Text } from '../../../elements'

const Issue = ({ item }) => {
  const {
    number,
    author: { login },
    publishedAt,
    title,
  } = item

  const now = new Date()
  const publishedDate = new Date(publishedAt)
  const difference = now.getTime() - publishedDate.getTime()
  const totalDays = Math.ceil(difference / (1000 * 3600 * 24))
  const result = totalDays > 0 ? totalDays : 0

  return (
    <>
      <Text fontWeight="bold" fontSize="18px">
        {title}
      </Text>

      <Text color="grey" fontSize="15px">
        # {number} opened {result} days ago by {login}
      </Text>
    </>
  )
}

export default Issue
