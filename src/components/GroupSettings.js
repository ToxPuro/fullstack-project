import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import Select from "react-select"
import { useQuery } from "@apollo/client"
import { GET_GROUP } from "../graphql/queries"
import Loader from "./Loader"

const options = [{ value: "private", label: "private" }, { value: "open", label: "open" }, { value: "public", label: "public" }]

const AddGroup = ({ setNotification }) => {
  const name = useParams().name
  const [privacyOption, setPrivacyOption ] = useState("private")
  const group = useQuery(GET_GROUP, { variables: { name } })
  useEffect(() => {
    if(group.data){
      console.log(group.data)
      setPrivacyOption(group.data.group.privacyOption)
    }
  }, [group.data])
  if(!group.data){
    return(
      <Loader/>
    )
  }
  console.log(privacyOption)
  const handleChoice = selectedOption => setPrivacyOption(selectedOption.value)
  const Change = () => {
    setNotification({ message: "Changes Saved", error: false })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return(
    <div>
      <h1>Group Settings</h1>
      <Select id="group-privacy" options={options} onChange={handleChoice} defaultValue={{ value: privacyOption, label: privacyOption }}/>
      <button onClick={Change}>Save Changes </button>
      <button id="homepage-button"> <Link to="/">Home Page</Link></button>
    </div>
  )}


export default AddGroup