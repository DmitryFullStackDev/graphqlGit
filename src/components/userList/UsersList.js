import {gql, useQuery} from '@apollo/client'
import React from 'react'
import {Box} from '@mui/material'
import User from './elements/User'

const UsersList = ({login = '', activeLogin, setActiveLogin}) => {
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

    const {data, loading} = useQuery(GET_USERS, {variables: {login}})

    if (loading) return <p>loading</p>
    if (!data) return <p>no data</p>

    return (
        <Box sx={{mt: 3, width: '100%', overflow: 'auto', py: 2, display: 'flex'}}>
            {data.search.nodes.map(item => (
                <User
                    key={item.id}
                    item={item}
                    activeLogin={activeLogin}
                    setActiveLogin={setActiveLogin}
                />
            ))}
        </Box>
    )
}

export default UsersList
