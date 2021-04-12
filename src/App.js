
import Login from "./components/Login"
import React, { useState, useEffect } from "react"
import SignIn from "./components/SignIn"

import { USER_EVENTS } from "./graphql/queries"
import AddEvent from "./components/AddEvent"

import Event from "./components/Event"
import HomePage from "./components/HomePage"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { useApolloClient, useLazyQuery } from "@apollo/client"


const App = () => {
  const [ token, setToken ] = useState(localStorage.getItem("user-token"))
  console.log(token)
  const client = useApolloClient()
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  const [getEvents, events] = useLazyQuery(USER_EVENTS)

  useEffect(() => {
    getEvents()
  },[])


  return (
    <Router>
      <Switch>
        <Route path="/SignIn">
          <SignIn setToken={setToken}/>
        </Route>
        <Route path="/login">
          <Login setToken={setToken}/>
        </Route>
        <Route path="/events/:id">
          <Event/>
        </Route>
        <Route path="/addevent">
          <AddEvent/>
        </Route>
        <Route path="/">
          {token ? <HomePage events={events} logout={logout}/> : <Redirect to="/login"/>}
        </Route>
      </Switch>
    </Router>
  )
}


export default App
