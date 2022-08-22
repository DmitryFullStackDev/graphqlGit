import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  concat,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const GITHUB_BASE_URL = 'https://api.github.com/graphql'

const httpLink = new HttpLink({ uri: GITHUB_BASE_URL })

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token')
  /*'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'*/ /*localStorage.getItem('token')*/
  operation.setContext({
    headers: {
      authorization: token ? 'Bearer ' + token : '',
    },
  })

  return forward(operation)
})

const cache = new InMemoryCache()

const graphQLClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache,
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ApolloProvider client={graphQLClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
)
