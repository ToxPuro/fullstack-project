import React from "react"
import { useQuery, useMutation } from "@apollo/client"
import { ALL_GROUPS } from "../graphql/queries"
import { JOIN_GROUP } from "../graphql/mutations"

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
  const groups = useQuery(ALL_GROUPS)
  return (
    <div>
      Hello World
      <ul>
        {groups.data ? groups.data.allGroups.map(group => (<JoinGroupElement key = {group.id} group={group}/>)) : null }
      </ul>
    </div>
  )
}

export default JoinGroup