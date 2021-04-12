import React from "react"
import { useQuery } from "@apollo/client"
import { USER_GROUPS } from "../graphql/queries"
import { Link } from "react-router-dom"
const Groups = () => {
  const groups = useQuery(USER_GROUPS)
  const displayGroups = groups.data ? groups.data.userGroups.map(group => (<li key={group.name}><Link to ={`/groups/${group.id}`}>{group.name}</Link></li>)) : []
  return(
    <div>
      <ul>
        {displayGroups}
      </ul>
    </div>
  )
}

export default Groups