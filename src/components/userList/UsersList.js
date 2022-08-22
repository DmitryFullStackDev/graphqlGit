import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { Box } from '../../elements'
import User from './elements/User'

const UsersList = ({ login = '', activeLogin, setActiveLogin }) => {
  const GET_USERS = gql`
    query searchUsers($login: String!) {
      search(query: $login, type: USER, first: 10) {
        nodes {
          ... on User {
            id
            name
            login
            avatarUrl(size: 200)
            repositories(first: 5) {
              totalCount
              nodes {
                stargazers {
                  totalCount
                }
              }
            }
          }
        }
      }
    }
  `

  const { data, loading } = useQuery(GET_USERS, { variables: { login } })

  if (loading) {
    return <p>loading</p>
  }

  if (!data) {
    return <p>no data</p>
  }

  return (
    <Box margin="20px 0 0 0" overflow="auto" width="100%" padding="20px 0">
      {data.search.nodes.map(item => (
        <User
          activeLogin={activeLogin}
          setActiveLogin={setActiveLogin}
          key={item.id}
          item={item}
        />
      ))}
    </Box>
  )
}

export default UsersList
