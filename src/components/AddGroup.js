import React, { useState } from "react"
import { Formik } from "formik"
import { Link } from "react-router-dom"
import { useMutation } from "@apollo/client"
import { ADD_GROUP } from "../graphql/mutations"
import { USER_GROUPS } from "../graphql/queries"
const AddGroup = ({ setNotification }) => {
  const[addGroup]  = useMutation(ADD_GROUP, {
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: USER_GROUPS })
      if(dataInStore){
        store.writeQuery({
          query: USER_GROUPS,
          data: {
            me: {
              ...dataInStore.me,
              groups: dataInStore.me.groups.concat(response.data.createGroup)
            }
          }
        })
      }
    }
  })

  const [ users, setUsers] = useState([])
  return(
    <div>
      <h1>New Group</h1>
      <Formik
        initialValues={{ name: "", user: "" }}
        onSubmit={async ({ name }, { resetForm }) => {
          await addGroup({ variables: { name, users } })
          setNotification({ message: `added group ${name}`, error: false })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          resetForm({})
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