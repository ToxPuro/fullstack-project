
import Login from "./components/Login"
import React, { useState } from "react"
import SignIn from "./components/SignIn"

import AddEvent from "./components/AddEvent"

import Event from "./components/Event"
import HomePage from "./components/HomePage"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import useLogin from "./hooks/useLogin"


const App = () => {
  const [token, setToken] = useState(localStorage.getItem("user-token"))
  const { logout } = useLogin(setToken)



  return (
    <Router>
      <Switch>
        <Route path="/SignIn">
          <SignIn setToken= {setToken}/>
        </Route>
        <Route path="/login">
          <Login setToken = {setToken} />
        </Route>
        <Route path="/events/:id">
          <Event/>
        </Route>
        <Route path="/addevent">
          <AddEvent/>
        </Route>
        <Route path="/">
          {token ? <HomePage logout={logout}/> : <Redirect to="/login"/>}
        </Route>
      </Switch>
    </Router>
  )
}


export default App
