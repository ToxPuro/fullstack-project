import Calendar from "./components/Calendar"
import AddEvent from './components/AddEvent'
import {BrowserRouter as Router, Switch, Route, Link, useParams, useHistory} from 'react-router-dom'
const App = () => {
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
