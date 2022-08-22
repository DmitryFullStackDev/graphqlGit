import { gql, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { Box, Button, Text } from '../../elements'
import CreateIssue from './elements/CrateIssue'
import Issue from './elements/Issue'

const IssueList = ({ activeLogin, repoName }) => {
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

  const { data, loading, refetch } = useQuery(GET_ISSUES, {
    variables: { owner: activeLogin, name: repoName },
  })

  const [isCreateIssue, setIsCreateIssue] = useState(false)

  if (!data) {
    return <p>no data</p>
  }

  return (
    <>
      <Box
        direction="column"
        with="100%"
        padding="15px 0"
        margin="20px"
        alignSelf="stretch"
      >
        <Box width="100%" justify="space-between">
          <Text fontSize="26px">{repoName}</Text>

          <Box align="center">
            <Text fontSize="16px">
              {data.repository.stargazers.totalCount} Stars
            </Text>
            <Box width="2px" height="2px" background="grey" margin="0 6px" />
            <Text fontSize="15px">
              {data.repository.watchers.totalCount} Watching
            </Text>
          </Box>
        </Box>

        <Box justify="space-between" align="center">
          <Text margin="40px 0 10px 0" fontSize="20px">
            Open Issues
          </Text>

          <Button
            onClick={() => setIsCreateIssue(true)}
            padding="5px 40px"
            backgroundColor="mediumseagreen"
          >
            Open Issue
          </Button>
        </Box>

        <Box padding="10px 0 0 0" height="180px" direction="column">
          {false ? (
            <p>loading</p>
          ) : (
            data.repository.issues.nodes.map((item, index, arr) => (
              <Box
                key={item.id}
                direction="column"
                with="100%"
                margin="0 0 0 -5px"
                padding="20px 5px"
                borderTop="1px solid grey"
                borderBottom={
                  index === arr.length - 1 ? '1px solid grey' : 'none'
                }
              >
                <Issue key={item.id} item={item} />
              </Box>
            ))
          )}
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
