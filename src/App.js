import PreviewCalendar from "./components/PreviewCalendar"
import AddEvent from './components/AddEvent'
import Login from './components/Login'
import {BrowserRouter as Router, Switch, Route, Link, useParams, useHistory} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useApolloClient, useQuery } from "@apollo/client"
import Button from 'react-bootstrap/Button';


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
          <PreviewCalendar/>
          <Button><Link to="/addevent">add event</Link></Button>
          <button onClick={logout}>Log Out</button>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
