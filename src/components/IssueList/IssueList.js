import {gql, useQuery} from '@apollo/client'
import React, {useState} from 'react'
import {Box, Button, CircularProgress, Typography} from '@mui/material'
import CreateIssue from './elements/CrateIssue'
import Issue from './elements/Issue'

const IssueList = ({activeLogin, repoName}) => {
    const GET_ISSUES = gql`
    query getIssues($name: String!, $owner: String!) {
      repository(name: $name, owner: $owner) {
        id
        watchers {
          totalCount
        }
        viewerHasStarred
        stargazers {
          totalCount
        }
        issues(last: 5) {
          nodes {
            id
            author {
              login
            }
            number
            publishedAt
            title
          }
        }
      }
    }
  `

    const {data, loading, refetch} = useQuery(GET_ISSUES, {
        variables: {owner: activeLogin, name: repoName},
    })

    const [isCreateIssue, setIsCreateIssue] = useState(false)

    if (loading) {
        return (
            <Box textAlign="center" color="text.secondary">
                <CircularProgress size={40} thickness={5} sx={{mb: 2}}/>
                <Typography variant="body1" color="textSecondary">
                    Loading issues...
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
        <>
            <Box
                display="flex"
                flexDirection="column"
                width="100%"
                p="15px 0"
                m="20px"
                alignSelf="stretch"
            >
                <Box display="flex" justifyContent="space-between" width="100%">
                    <Typography fontSize="26px">{repoName}</Typography>

                    <Box display="flex" alignItems="center">
                        <Typography fontSize="16px">
                            {data.repository.stargazers.totalCount} Stars
                        </Typography>
                        <Box
                            sx={{
                                width: 6,
                                height: 6,
                                bgcolor: 'grey.500',
                                mx: 1.5,
                                borderRadius: '50%',
                            }}
                        />
                        <Typography fontSize="15px">
                            {data.repository.watchers.totalCount} Watching
                        </Typography>
                    </Box>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography mt="40px" mb="10px" fontSize="20px">
                        Open Issues
                    </Typography>

                    <Button
                        variant="contained"
                        sx={{
                            padding: '5px 40px',
                            backgroundColor: 'mediumseagreen',
                            '&:hover': {
                                backgroundColor: 'seagreen',
                            },
                        }}
                        onClick={() => setIsCreateIssue(true)}
                    >
                        Open Issue
                    </Button>
                </Box>

                <Box
                    pt={1}
                    height="180px"
                    display="flex"
                    flexDirection="column"
                    justifyContent={loading ? 'center' : 'flex-start'}
                    alignItems="center"
                    sx={{borderTop: '1px solid grey', borderBottom: '1px solid grey'}}
                >
                    {data.repository.issues.nodes.map((item, index, arr) => (
                        <Box
                            key={item.id}
                            display="flex"
                            flexDirection="column"
                            width="100%"
                            margin="0 0 0 -5px"
                            padding="20px 5px"
                            borderTop="1px solid grey"
                            borderBottom={index === arr.length - 1 ? '1px solid grey' : 'none'}
                        >
                            <Issue key={item.id} item={item}/>
                        </Box>
                    ))}
                </Box>
            </Box>

            {isCreateIssue && (
                <CreateIssue
                    refetch={refetch}
                    setIsOpen={setIsCreateIssue}
                    id={data.repository.id}
                />
            )}
        </>
    )
}

export default IssueList
