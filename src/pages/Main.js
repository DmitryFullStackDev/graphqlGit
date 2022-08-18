import React, { useState } from 'react'
import { RepoList, Search, UsersList } from '../components'
import { Box, Button } from '../elements'

const Main = () => {
  const [search, setSearch] = useState('')
  const [isSearch, setIsSearch] = useState(false)
  const [activeLogin, setActiveLogin] = useState(false)

  return (
    <>
      <Box>
        <Search setIsSearch={setIsSearch} value={search} setValue={setSearch} />
        <Button onClick={() => setIsSearch(true)}>search it</Button>
      </Box>

      {isSearch && (
        <UsersList
          activeLogin={activeLogin}
          setActiveLogin={setActiveLogin}
          login={search}
        />
      )}

      {Boolean(activeLogin) && <RepoList activeLogin={activeLogin} />}
    </>
  )
}

export default Main
