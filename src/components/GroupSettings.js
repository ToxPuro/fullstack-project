import React, { useState } from "react"
import { Link } from "react-router-dom"
import Select from "react-select"

const options = [{ value: "private", label: "private" }, { value: "open", label: "open" }, { value: "public", label: "public" }]

const AddGroup = ({ setNotification }) => {
  const [privacyOption, setPrivacyOption ] = useState("private")
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
      <Select id="group-privacy" options={options} onChange={handleChoice}/>
      <button onClick={Change}>Save Changes </button>
      <button id="homepage-button"> <Link to="/">Home Page</Link></button>
    </div>
  )}


export default AddGroup