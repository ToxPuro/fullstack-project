import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { GROUPS_THAT_USER_CAN_JOIN } from "../graphql/queries"
import { JOIN_REQUEST } from "../graphql/mutations"
import { Link } from "react-router-dom"
import Loader from "./Loader"

const JoinGroupElement = ({ group, setNotification }) => {
  const [ request ] = useMutation(JOIN_REQUEST,{
    onError: error => {
      console.log(error)
    }
  })

  const sendRequest = () => {
    request({ variables: { group: group.name } })
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
  const [ groupPrivacyType, setGroupPrivacyType ] = useState("public")
  const groups = useQuery(GROUPS_THAT_USER_CAN_JOIN)
  if(!groups.data){
    return(
      <Loader/>
    )
  }
  let displayGroups = groups.data.me.groupsUserCanJoin.filter(group => group.privacyOption === groupPrivacyType)
  return (
    <div>
      Hello World
      <ul>
        {groups.data ? displayGroups.map(group => (<JoinGroupElement setNotification = {setNotification} key = {group.id} group={group} />)) : null }
      </ul>
      <button id="homepage-button"> <Link to="/">Home Page</Link></button>
      <button onClick={() => setGroupPrivacyType("open")}></button>
    </div>
  )
}

export default JoinGroup