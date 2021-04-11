import React, {useEffect} from "react"
import Button from "react-bootstrap/Button"
import { USER_EVENTS } from "../graphql/queries"
import PreviewCalendar from "./PreviewCalendar"
import AddEvent from "./AddEvent"
import Events from "./Events"
import Event from "./Event"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { useApolloClient, useQuery } from "@apollo/client"

const AppWhenLoggedIn = ({ setToken }) => {
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  const [getEvents, events] = useLazyQuery(USER_EVENTS)

  return(
    <Router>
      <Switch>
        <Route path="/events/:id">
          <Event/>
        </Route>
        <Route path="/addevent">
          <AddEvent/>
        </Route>
        <Route path="/">
          <PreviewCalendar/>
          {events.data ? <Events events={events.data.userEvents}/> : null }
          <Button id="addevent"><Link to="/addevent">add event</Link></Button>
          <button id="logout-button"onClick={logout}>Log Out</button>
        </Route>
      </Switch>
    </Router>
  )
}

export default AppWhenLoggedIn