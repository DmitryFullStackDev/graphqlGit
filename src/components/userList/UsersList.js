import {gql, useQuery} from '@apollo/client'
import React from 'react'
import {Box, CircularProgress, Typography} from '@mui/material'
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
    console.log(data)
    if (loading) {
        return (
            <Box textAlign="center" color="text.secondary">
                <CircularProgress size={40} thickness={5} sx={{mb: 2}}/>
                <Typography variant="body1" color="textSecondary">
                    Loading users...
                </Typography>
            </Box>
        )
    }

    if (!data) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                <Typography>No data available</Typography>
            </Box>
        )
    }

    return (
        <Box sx={{mt: 3, width: '100%', overflow: 'auto', py: 2, display: 'flex'}}>
            {data.search.nodes
                .filter(user => user?.repositories)
                .map(item => (
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
