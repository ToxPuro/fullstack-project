
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
import Messages from "./components/Messages"
import Message from "./components/Message"
import GroupAddUsers from "./components/GroupAddUsers"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import useLogin from "./hooks/useLogin"


const App = () => {
  const [ notification, setNotification ] = useState(null)



  return (
    <div>
      <Notification notification={notification}/>
      <Router>
        <AppRouter setNotification={setNotification}/>
      </Router>
    </div>

  )
}

const AppRouter = ({ setNotification }) => {
  const [token, setToken] = useState(localStorage.getItem("user-token"))
  const { logout, login, signIn } = useLogin(setToken, setNotification)
  return(
    <Switch>
      <Route path ="/messages/:id">
        { token ? <Message/>: <Redirect to="/login"/>}
      </Route>
      <Route path ="/messages">
        { token ? <Messages/>: <Redirect to="/login"/>}
      </Route>
      <Route path="/joinGroup">
        {token ? <JoinGroup setNotification = {setNotification}/> : <Redirect to="/login"/> }
      </Route>
      <Route path="/users/:username">
        {token ? <User/>: <Redirect to="/login"/>}
      </Route>
      <Route path ="/groups/:name/addusers">
        { token ? <GroupAddUsers setNotification={setNotification}/>: <Redirect to="/login"/>}
      </Route>
      <Route path ="/groups/:name">
        { token ? <Group setNotification={setNotification}/>: <Redirect to="/login"/>}
      </Route>
      <Route path="/groups">
        {token ? <Groups setNotification= {setNotification}/> : <Redirect to="/login"/> }
      </Route>
      <Route path="/addGroup">
        { token ? <AddGroup setNotification = {setNotification}/> : <Redirect to="/login"/> }
      </Route>
      <Route path="/SignIn">
        <SignIn login = {login} signIn = {signIn}/>
      </Route>
      <Route path="/login">
        <Login login = {login} />
      </Route>
      <Route path="/events/:id">
        {token ? <Event setNotification={setNotification}/> : <Redirect to="/login"/> }
      </Route>
      <Route path="/addevent">
        {token ? <AddEvent setNotification={setNotification}/> : <Redirect to="/login"/>}
      </Route>
      <Route path="/">
        {token ? <HomePage logout={logout}/> : <Redirect to="/login"/>}
      </Route>
    </Switch>
  )
}


export default App
