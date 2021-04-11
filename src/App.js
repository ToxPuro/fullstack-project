
import Login from "./components/Login"
import React, { useState } from "react"
import AppWhenLoggedIn from "./components/AppWhenLoggedIn"


const App = () => {

  const [ token, setToken ] = useState(localStorage.getItem("user-token"))
  if(!token){
    return(
      <Login setToken={setToken}/>
    )
  }

  return (
    <AppWhenLoggedIn setToken={setToken}/>
  )
}

export default App
