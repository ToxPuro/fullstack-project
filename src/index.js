import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { setContext } from "apollo-link-context"
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("user-token")
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})

const httpLink = new HttpLink({ uri: "http://dev-server:4000/graphql" })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root"))
