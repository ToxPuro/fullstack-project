
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
import Notification from "./components/Notification"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import useLogin from "./hooks/useLogin"


const App = () => {
  const [ notification, setNotification ] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("user-token"))
  const { logout, login } = useLogin(setToken, setNotification)



  return (
    <div>
      <Notification notification={notification}/>
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
            <SignIn login = {login}/>
          </Route>
          <Route path="/login">
            <Login login = {login} />
          </Route>
          <Route path="/events/:id">
            {token ? <Event/> : <Redirect to="/login"/> }
          </Route>
          <Route path="/addevent">
            {token ? <AddEvent setNotification={setNotification}/> : <Redirect to="/login"/>}
          </Route>
          <Route path="/">
            {token ? <HomePage logout={logout}/> : <Redirect to="/login"/>}
          </Route>
        </Switch>
      </Router>
    </div>

  )
}


export default App
