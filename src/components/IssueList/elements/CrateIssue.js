import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import {
  Box,
  Button,
  Input,
  Mask,
  OutsiderClicker,
  Text,
  Textarea,
} from '../../../elements'

const CreateIssue = ({ setIsOpen, refetch, id }) => {
  const CREATE_ISSUE = gql`
    mutation ($repositoryId: ID!, $title: String!, $body: String) {
      createIssue(
        input: { repositoryId: $repositoryId, title: $title, body: $body }
      ) {
        issue {
          body
        }
      }
    }
  `

  const [createIssueGQL, { data, loading, error }] = useMutation(CREATE_ISSUE)

  const [textValue, setTextValue] = useState('')
  const [inputValue, setInputValue] = useState('')

  const closeOptions = () => setIsOpen(false)

  return (
    <Mask justify="center" align="center" dark>
      <OutsiderClicker width="auto" func={closeOptions}>
        <Box
          relative
          background="white"
          width="700px"
          direction="column"
          padding="15px"
        >
          <Text margin="0 0 10px 0" fontSize="24px">
            Create New Issue
          </Text>

          <Input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            width="100%"
            placeholder="Title"
          />

          <Textarea
            onChange={e => setTextValue(e.target.value)}
            value={textValue}
            placeholder="description"
            margin="15px 0 25px 0"
            width="100%"
          />

          <Box margin=" 0 0 0 auto">
            <Button
              onClick={() => setIsOpen(false)}
              backgroundColor="darkred"
              margin="0 10px 0 0"
            >
              Cancel
            </Button>

            <Button
              onClick={() => {
                createIssueGQL({
                  variables: {
                    repositoryId: id,
                    title: inputValue,
                    body: textValue,
                  },
                })
                  .then(() => setIsOpen(false))
                  .then(() => refetch())
              }}
              backgroundColor="darkgreen"
            >
              Create
            </Button>
          </Box>
        </Box>
      </OutsiderClicker>
    </Mask>
  )
}

export default CreateIssue
