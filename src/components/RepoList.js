import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { Box } from '../elements'

const RepoList = ({ activeLogin }) => {
  const GET_REPOS = gql`
    query getListOfRepo {
      user(login: "dima") {
        repositories(first: 5) {
          totalCount
          nodes {
            name
            owner {
              login
            }
            description
            watchers {
              totalCount
            }
            viewerHasStarred
            stargazers {
              totalCount
            }
          }
        }
      }
    }
  `

  const { data, loading } = useQuery(GET_REPOS, { variables: { activeLogin } })

  if (loading) {
    return <p>loading</p>
  }

  if (!data) {
    return <p>no user</p>
  }

  return (
    <Box>
      {data.user.repositories.nodes.map(item => (
        <Box width="300px" height="100">
          <p>p</p>
        </Box>
      ))}
    </Box>
  )
}

export default RepoList
