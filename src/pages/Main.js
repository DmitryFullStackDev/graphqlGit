import React, {useState} from 'react'
import {RepoList, Search, UsersList} from '../components'
import IssueList from '../components/IssueList/IssueList'
import {Button, Stack} from '@mui/material'

const Main = () => {
    const [search, setSearch] = useState('')
    const [isSearch, setIsSearch] = useState(false)
    const [activeLogin, setActiveLogin] = useState(false)
    const [activeIssues, setActiveIssues] = useState(false)
    const [isRepoList, setIsRepoList] = useState(false)

    const dismissFunc = () => {
        setIsSearch(false)
        setActiveLogin(false)
    }

    const setActiveIssuesFunc = value => {
        setActiveIssues(value)
        setIsRepoList(false)
    }

    const setActiveLoginFunc = value => {
        setActiveLogin(value)
        setIsRepoList(true)
        setActiveIssues(false)
    }

    const searchFunc = () => {
        setIsSearch(true)
        setIsRepoList(false)
        setActiveIssues(false)
    }

    return (
        <Stack direction="column" width="100%" alignItems="center" spacing={2}>
            <Stack direction="row" spacing={1} alignItems="center">
                <Search dismissFunc={dismissFunc} value={search} setValue={setSearch}/>
                <Button
                    variant="contained"
                    onClick={searchFunc}
                    sx={{height: '35px'}}
                >
                    search
                </Button>
            </Stack>

            {isSearch && (
                <UsersList
                    activeLogin={activeLogin}
                    setActiveLogin={setActiveLoginFunc}
                    login={search}
                />
            )}

            {Boolean(activeLogin) && isRepoList && (
                <RepoList
                    setActiveIssues={setActiveIssuesFunc}
                    activeLogin={activeLogin}
                />
            )}

            {Boolean(activeIssues) && (
                <IssueList activeLogin={activeLogin} repoName={activeIssues}/>
            )}
        </Stack>
    )
}

export default Main
