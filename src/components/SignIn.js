import React from "react"
import { Formik } from "formik"
import * as yup from "yup"

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required"),
  name: yup
    .string()
    .required("Name is required"),
  password: yup
    .string()
    .required("Password is required")

})

const SignIn = ({ login, signIn }) => {
  const onSubmit = async ({ username, name, password }, { resetForm }) => {
    const signInSuccessful = await signIn(username, name, password)
    if(signInSuccessful){
      await login({ username, password })
    }

    resetForm({ values: { username: "", password: "", name: "" } })
  }







  return(
    <div>
      <h1>Sign In</h1>
      <Formik
        initialValues={{ username: "", password: "", name: "" }}
        onSubmit={onSubmit}
        validationSchema = {validationSchema}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          dirty
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
           username: <input
              id="username"
              type="text"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />

            <br/>

            name: <input
              id="name"
              type="text"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />

            <br/>

           password: <input
              id="password"
              type= "text"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <br/>
            { (isValid && dirty) ?             <button type="submit" id="submit-button">
             Sign In
            </button> : null}
          </form>
        )}
      </Formik>
    </div>
  )}


export default SignIn