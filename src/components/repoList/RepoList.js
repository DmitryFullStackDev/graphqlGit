import { gql, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Box, Button, Text } from '../../elements'
import Repository from './elements/Repository'

const RepoList = ({ activeLogin, setActiveIssues }) => {
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
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
          nodes {
            id
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

  const [currentPage, setCurrentPage] = useState(1)

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

  const itemsPerPage = 4

  const { fetchMore, data, loading, refetch } = useQuery(GET_REPOS, {
    variables: { login: activeLogin, first: itemsPerPage },
  })

  useEffect(() => {
    setCurrentPage(1)
    refetch({ login: activeLogin, first: itemsPerPage })
  }, [activeLogin])

  if (!data) {
    return <p>loading</p>
  }

  const totalPages = Math.ceil(data.user.repositories.totalCount / itemsPerPage)
  const remain = data.user.repositories.totalCount % itemsPerPage

  return (
    <Box
      direction="column"
      with="100%"
      padding="15px 0"
      borderTop="0.8px solid grey"
      margin="20px"
      alignSelf="stretch"
    >
      <Text fontSize="20px">User Repositories</Text>

      <Box padding="10px 0 0 0" height="180px" direction="column">
        {loading ? (
          <p>loading</p>
        ) : (
          data.user.repositories.nodes.map(item => (
            <Repository
              setActiveIssues={setActiveIssues}
              key={item.id}
              item={item}
            />
          ))
        )}
      </Box>

      <Box alignSelf="center" align="center">
        <Button
          height="30px"
          disabled={!data.user.repositories.pageInfo.hasPreviousPage}
          onClick={() => {
            if (loading) {
              return
            }
            fetchMore({
              variables: {
                before: null,
                last: null,
                first: itemsPerPage,
              },
              notifyOnNetworkStatusChange: true,
              updateQuery,
            }).then(() => setCurrentPage(1))
          }}
        >
          1
        </Button>

        <Button
          height="30px"
          margin="0 5px"
          disabled={!data.user.repositories.pageInfo.hasPreviousPage}
          onClick={() => {
            if (loading) {
              return
            }
            fetchMore({
              variables: {
                after: null,
                before: data.user.repositories.pageInfo.startCursor,
                last: itemsPerPage,
                first: null,
              },
              notifyOnNetworkStatusChange: true,
              updateQuery,
            }).then(() => setCurrentPage(p => p - 1))
          }}
        >
          prev
        </Button>

        <Text fontSize="16px" margin="0 5px">
          {currentPage}
        </Text>

        <Button
          margin="0 5px"
          height="30px"
          disabled={!data.user.repositories.pageInfo.hasNextPage}
          onClick={() => {
            if (loading) {
              return
            }
            fetchMore({
              variables: {
                before: null,
                after: data.user.repositories.pageInfo.endCursor,
                first: itemsPerPage,
                last: null,
              },
              updateQuery,
              notifyOnNetworkStatusChange: true,
            }).then(() => setCurrentPage(p => p + 1))
          }}
        >
          next
        </Button>

        <Button
          height="30px"
          disabled={!data.user.repositories.pageInfo.hasNextPage}
          onClick={() => {
            if (loading) {
              return
            }
            fetchMore({
              variables: {
                last: remain,
                first: null,
              },
              notifyOnNetworkStatusChange: true,
              updateQuery,
            }).then(() => setCurrentPage(totalPages))
          }}
        >
          {totalPages}
        </Button>
      </Box>
    </Box>
  )
}

export default RepoList
