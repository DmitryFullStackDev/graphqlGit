import {gql, useQuery} from '@apollo/client'
import React, {useEffect, useState} from 'react'
import {Box, Button, CircularProgress, Typography} from '@mui/material'
import Repository from './elements/Repository'

const RepoList = ({activeLogin, setActiveIssues}) => {
    const GET_REPOS = gql`
    query getListOfRepo(
      $login: String!
      $after: String
      $before: String
      $last: Int
      $first: Int
    ) {
      user(login: $login) {
        repositories(first: $first, last: $last, after: $after, before: $before) {
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

    const updateQuery = (previousResult, {fetchMoreResult}) => {
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

    const {fetchMore, data, loading, refetch} = useQuery(GET_REPOS, {
        variables: {login: activeLogin, first: itemsPerPage},
    })

    useEffect(() => {
        setCurrentPage(1)
        refetch({login: activeLogin, first: itemsPerPage})
    }, [activeLogin])

    if (loading) {
        return (
            <Box textAlign="center" color="text.secondary">
                <CircularProgress size={40} thickness={5} sx={{mb: 2}}/>
                <Typography variant="body1" color="textSecondary">
                    Loading repos...
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

    const totalPages = Math.ceil(data.user.repositories.totalCount / itemsPerPage)
    const remain = data.user.repositories.totalCount % itemsPerPage

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                padding: '15px 0',
                borderTop: '0.8px solid grey',
                margin: '20px',
                alignSelf: 'stretch',
            }}
        >
            <Typography variant="h6" sx={{fontSize: '20px'}}>
                User Repositories
            </Typography>

            <Box sx={{padding: '10px 0 0 0', height: '180px', display: 'flex', flexDirection: 'column'}}>
                {data.user.repositories.nodes.map(item => (
                    <Repository key={item.id} item={item} setActiveIssues={setActiveIssues}/>
                ))}
            </Box>

            <Box sx={{alignSelf: 'center', display: 'flex', alignItems: 'center'}}>
                <Button
                    sx={{height: '30px'}}
                    disabled={!data.user.repositories.pageInfo.hasPreviousPage}
                    onClick={() => {
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
                    sx={{height: '30px', margin: '0 5px'}}
                    disabled={!data.user.repositories.pageInfo.hasPreviousPage}
                    onClick={() => {
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

                <Typography sx={{fontSize: '16px', margin: '0 5px'}}>
                    {currentPage}
                </Typography>

                <Button
                    sx={{height: '30px', margin: '0 5px'}}
                    disabled={!data.user.repositories.pageInfo.hasNextPage}
                    onClick={() => {
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
                    sx={{height: '30px'}}
                    disabled={!data.user.repositories.pageInfo.hasNextPage}
                    onClick={() => {
                        fetchMore({
                            variables: {
                                last: remain || itemsPerPage,
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
