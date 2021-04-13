
import Login from "./components/Login"
import React, { useState } from "react"
import SignIn from "./components/SignIn"

import AddEvent from "./components/AddEvent"
import AddGroup from "./components/AddGroup"
import Event from "./components/Event"
import HomePage from "./components/HomePage"
import Groups from "./components/Groups"
import Group from "./components/Group"
import User from "./components/User"
import JoinGroup from "./components/JoinGroup"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import useLogin from "./hooks/useLogin"


const App = () => {
  const [token, setToken] = useState(localStorage.getItem("user-token"))
  const { logout } = useLogin(setToken)



  return (
    <Router>
      <Switch>
        <Route path="/joinGroup">
          {token ? <JoinGroup/> : <Redirect to="/login"/> }
        </Route>
        <Route path="/users/:id">
          {token ? <User/>: <Redirect to="/login"/>}
        </Route>
        <Route path ="/groups/:id">
          { token ? <Group/>: <Redirect to="/login"/>}
        </Route>
        <Route path="/groups">
          {token ? <Groups/> : <Redirect to="/login"/> }
        </Route>
        <Route path="/addGroup">
          { token ? <AddGroup/> : <Redirect to="/login"/> }
        </Route>
        <Route path="/SignIn">
          <SignIn setToken= {setToken}/>
        </Route>
        <Route path="/login">
          <Login setToken = {setToken} />
        </Route>
        <Route path="/events/:id">
          {token ? <Event/> : <Redirect to="/login"/> }
        </Route>
        <Route path="/addevent">
          {token ? <AddEvent/> : <Redirect to="/login"/>}
        </Route>
        <Route path="/">
          {token ? <HomePage logout={logout}/> : <Redirect to="/login"/>}
        </Route>
      </Switch>
    </Router>
  )
}


export default App
