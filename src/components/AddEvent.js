import React, { useState } from "react"
import { Formik } from "formik"
import { useMutation, useQuery } from "@apollo/client"
import { ADD_EVENT } from "../graphql/mutations"
import { ME, USER_GROUPS } from "../graphql/queries"
import Select from "react-select"
import ChoiceCalendar from "./ChoiceCalendar"
import { Link } from "react-router-dom"
const AddEvent = () => {
  const [ dates, setDates] = useState([])
  const [choice, setChoice] = useState(null)
  const handleChoice = selectedOption => {
    setChoice(selectedOption.value)
  }
  const groups = useQuery(USER_GROUPS)
  let options = []
  if(groups.data){
    options = groups.data.userGroups.map(group => (
      { value: group.name, label: group.name }
    ))
  }
  const [addEvent ] = useMutation(ADD_EVENT, {
    update: (store, response) => {
      console.log("dataInStore:")
      const dataInStore = store.readQuery({ query: ME })
      const eventsInStore = dataInStore.me.events
      console.log(dataInStore.me)
      console.log(eventsInStore)
      console.log(response)
      store.writeQuery({
        query: ME,
        data: {
          me: {
            ...dataInStore.me,
            events: eventsInStore.concat(response.data.addEvent)
          }
        }
      })
    }
  })
  return(
    <div>
      <h1>New Event</h1>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={({ name }, { resetForm }) => {
          addEvent({ variables:{ name, group: choice, dates } })
          resetForm({})
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
           event name: <input
              id="name"
              type="text"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            <button id ="submit-button"type="submit">
             Submit
            </button>
          </form>
        )}
      </Formik>
      <Select id="group-options"options={options} onChange={handleChoice} />
      <h2>Choose possible days</h2>
      <ChoiceCalendar dates={dates} setDates={setDates}/>
      <button id="homepage-button"> <Link to="/">Home Page</Link></button>
    </div>
  )}


export default AddEvent