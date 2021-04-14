import React from "react"
import { useQuery } from "@apollo/client"
import { USER_GROUPS } from "../graphql/queries"
import { Link } from "react-router-dom"
const Groups = () => {
  const groups = useQuery(USER_GROUPS)
  const displayGroups = groups.data ? groups.data.me.groups.map(group => (<li key={group.name}><Link to ={`/groups/${group.id}`}>{group.name}</Link></li>)) : []
  if(displayGroups.length === 0 && groups.data){
    return(
      <div>
        <h2>{"It seems you aren't part any group yet"}</h2>
        <h2><Link to="/joinGroup">Join Here</Link></h2>
      </div>
    )
  }
  return(
    <div>
      <ul>
        {displayGroups}
      </ul>
    </div>
  )
}

export default Groups