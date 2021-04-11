
import Login from "./components/Login"
import React, { useState } from "react"
import AppWhenLoggedIn from "./components/AppWhenLoggedIn"
import SignIn from "./components/SignIn"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"


const App = () => {

  const [ token, setToken ] = useState(localStorage.getItem("user-token"))
  if(!token){
    return(
      <Router>
        <Switch>
          <Route path="/SignIn">
            <SignIn setToken={setToken}/>
          </Route>
          <Route path="/">
            <Login setToken={setToken}/>
          </Route>
        </Switch>
      </Router>

    )
  }

  return (
    <AppWhenLoggedIn setToken={setToken}/>
  )
}


export default App
