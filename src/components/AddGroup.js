import React, { useState } from "react"
import { Formik } from "formik"
import { Link } from "react-router-dom"
import { useMutation } from "@apollo/client"
import { ADD_GROUP } from "../graphql/mutations"
const AddGroup = () => {
  const[addGroup]  = useMutation(ADD_GROUP)
  const [ users, setUsers] = useState([])
  return(
    <div>
      <h1>New Group</h1>
      <Formik
        initialValues={{ name: "", user: "" }}
        onSubmit={async ({ name }, { resetForm }) => {
          console.log(name)
          console.log(users)
          const result = await addGroup({ variables: { name, users } })
          console.log(result.data)
          resetForm({})
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
           group name: <input
              id="name"
              type="text"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            <br/>
          users: <input
              id="user"
              type="text"
              name="user"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.user}/>
            <button type="button" id="add-user-button" onClick={() => {
              setUsers(users.concat(values.user))
              setFieldValue("user", "")
            }}>add user</button>
            <br/>
            {users.join(" ")}
            <br/>
            <button id ="submit-button"type="submit">
             Submit
            </button>
          </form>
        )}
      </Formik>
      <button id="homepage-button"> <Link to="/">Home Page</Link></button>
    </div>
  )}


export default AddGroup