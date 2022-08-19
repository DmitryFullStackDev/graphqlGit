import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { Box } from '../elements'

const RepoList = ({ activeLogin }) => {
  const GET_REPOS = gql`
    query getListOfRepo(
      $login: String!
      $after: String
      $before: String
      $last: Int
      $first: Int
    ) {
      user(login: $login) {
        repositories(
          first: $first
          last: $last
          after: $after
          before: $before
        ) {
          totalCount
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
          }
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

  const updateQuery = (previousResult, { fetchMoreResult }) => {
    if (!fetchMoreResult) {
      return previousResult
    }

    return {
      ...previousResult,
      user: {
        ...previousResult.user,
        repositories: {
          ...previousResult.user.repositories,
          ...fetchMoreResult.user.repositories,
          nodes: [...fetchMoreResult.user.repositories.nodes],
        },
      },
    }
  }

  const itemsPerPage = 1

  const { fetchMore, data, loading } = useQuery(GET_REPOS, {
    variables: { login: activeLogin, first: itemsPerPage },
  })

  if (loading) {
    return <p>loading</p>
  }

  if (!data) {
    return <p>no user</p>
  }

  const totalPages = data.user.repositories.totalCount / itemsPerPage

  return (
    <Box>
      {data.user.repositories.nodes.map((item, index) => (
        <Box key={index} width="300px" height="100">
          <p>{item.name}</p>
        </Box>
      ))}

      {data.user.repositories.pageInfo.hasPreviousPage && (
        <button
          onClick={() =>
            fetchMore({
              variables: {
                before: data.user.repositories.pageInfo.endCursor,
                last: itemsPerPage,
                first: null,
              },
              updateQuery,
            })
          }
        >
          fetch back
        </button>
      )}

      {totalPages}

      {data.user.repositories.pageInfo.hasNextPage && (
        <button
          onClick={() =>
            fetchMore({
              variables: {
                after: data.user.repositories.pageInfo.endCursor,
                first: itemsPerPage,
                last: null,
              },
              updateQuery,
            })
          }
        >
          fetch more
        </button>
      )}
    </Box>
  )
}

export default RepoList
