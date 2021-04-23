import React from "react"
import { useQuery, useMutation } from "@apollo/client"
import { GROUPS_THAT_USER_IS_NOT_IN } from "../graphql/queries"
import { JOIN_REQUEST } from "../graphql/mutations"
import { Link } from "react-router-dom"
import Loader from "./Loader"

const JoinGroupElement = ({ group, setNotification }) => {
  const [ request ] = useMutation(JOIN_REQUEST)

  const sendRequest = () => {
    request({ variables: { id: group.id } })
    setNotification({ message: `Send joining request to ${group.name}`, error: false })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return(
    <li>
      <span>
        {group.name}
        <button onClick={sendRequest}>Request</button>
      </span>
    </li>
  )
}

const JoinGroup = ({ setNotification }) => {
  const groups = useQuery(GROUPS_THAT_USER_IS_NOT_IN)
  if(!groups.data){
    return(
      <Loader/>
    )
  }
  return (
    <div>
      Hello World
      <ul>
        {groups.data ? groups.data.me.groupsUserNotIn.map(group => (<JoinGroupElement setNotification = {setNotification} key = {group.id} group={group} />)) : null }
      </ul>
      <button id="homepage-button"> <Link to="/">Home Page</Link></button>
    </div>
  )
}

export default JoinGroup