import React from "react"
import { useQuery, useMutation } from "@apollo/client"
import { GROUPS_THAT_USER_IS_NOT_IN } from "../graphql/queries"
import { JOIN_GROUP } from "../graphql/mutations"
import { Link } from "react-router-dom"
import Loader from "./Loader"

const JoinGroupElement = ({ group }) => {
  const [ join ] = useMutation(JOIN_GROUP)
  return(
    <li>
      <span>
        {group.name}
        <button onClick={() => join({ variables: { id: group.id } })}>Join</button>
      </span>
    </li>
  )
}

const JoinGroup = () => {
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
        {groups.data ? groups.data.me.groupsUserNotIn.map(group => (<JoinGroupElement key = {group.id} group={group}/>)) : null }
      </ul>
      <button id="homepage-button"> <Link to="/">Home Page</Link></button>
    </div>
  )
}

export default JoinGroup