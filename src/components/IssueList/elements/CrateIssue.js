import {gql, useMutation} from '@apollo/client'
import React, {useState} from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography,} from '@mui/material'

const CreateIssue = ({setIsOpen, refetch, id}) => {
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

    const [createIssueGQL, {loading, error}] = useMutation(CREATE_ISSUE)

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const handleClose = () => setIsOpen(false)

    const handleCreate = () => {
        createIssueGQL({
            variables: {
                repositoryId: id,
                title,
                body,
            },
        })
            .then(() => {
                setIsOpen(false)
                refetch()
            })
    }

    return (
        <Dialog open onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Typography variant="h5">Create New Issue</Typography>
            </DialogTitle>

            <DialogContent dividers>
                <TextField
                    label="Title"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    disabled={loading}
                />
                <TextField
                    label="Description"
                    fullWidth
                    margin="normal"
                    multiline
                    minRows={4}
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    disabled={loading}
                />
                {error && (
                    <Typography color="error" variant="body2" mt={2}>
                        Error creating issue: {error.message}
                    </Typography>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="error" disabled={loading}>
                    Cancel
                </Button>
                <Button
                    onClick={handleCreate}
                    color="success"
                    variant="contained"
                    disabled={loading || !title.trim()}
                >
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateIssue
