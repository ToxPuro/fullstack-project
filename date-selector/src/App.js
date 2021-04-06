import Calendar from "./components/Calendar"
import AddEvent from './components/AddEvent'
import Login from './components/Login'
import {BrowserRouter as Router, Switch, Route, Link, useParams, useHistory} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useApolloClient } from "@apollo/client"

const App = () => {
  const [ token, setToken ] = useState(localStorage.getItem('user-token'))

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if(!token){
    return(
      <Login setToken={setToken}/>
    )
  }

  return (
    <Router>
      <Switch>
        <Route path="/addevent">
          <AddEvent/>
        </Route>
        <Route path="/">
          <Calendar/>
          <button><Link to="/addevent">add event</Link></button>
          <button onClick={logout}>Log Out</button>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
