import React, { useState } from 'react'
import { RepoList, Search, UsersList } from '../components'
import IssueList from '../components/IssueList/IssueList'
import { Box, Button } from '../elements'

const Main = () => {
  const [search, setSearch] = useState('')
  const [isSearch, setIsSearch] = useState(false)
  const [activeLogin, setActiveLogin] = useState(false)
  const [activeIssues, setActiveIssues] = useState(false)

  const dismissFunc = () => {
    setIsSearch(false)
    setActiveLogin(false)
  }

  return (
    <Box direction="column" width="100%" align="center">
      <Box>
        <Search dismissFunc={dismissFunc} value={search} setValue={setSearch} />
        <Button onClick={() => setIsSearch(true)}>search it</Button>
      </Box>

      {isSearch && (
        <UsersList
          activeLogin={activeLogin}
          setActiveLogin={setActiveLogin}
          login={search}
        />
      )}

      {Boolean(activeLogin) && (
        <RepoList setActiveIssues={setActiveIssues} activeLogin={activeLogin} />
      )}

      {Boolean(activeIssues) && (
        <IssueList activeLogin={activeLogin} repoName={activeIssues} />
      )}
    </Box>
  )
}

export default Main
