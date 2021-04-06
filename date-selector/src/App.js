import Calendar from "./components/Calendar"
import AddEvent from './components/AddEvent'
import Login from './components/Login'
import {BrowserRouter as Router, Switch, Route, Link, useParams, useHistory} from 'react-router-dom'
import { useState } from 'react'

const App = () => {
  const [ token, setToken ] = useState(null)

  if(!token){
    return(
      <Login/>
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
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
