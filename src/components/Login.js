import { Formik } from "formik"
import { Link } from "react-router-dom"
import React from "react"
import * as yup from "yup"

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required"),
  password: yup
    .string()
    .required("Password is required")

})

const Login = ({ login }) => {
  return(
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={ async ({ username, password }, { resetForm }) => {
          await login({ username, password })
          resetForm({ values: { username: "", password: "" } })
        }}
        validationSchema={validationSchema}
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

           password: <input
              id="password"
              type= "password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <br/>
            {(isValid && dirty) ?  <button type="submit" id="login-button">
              Login
            </button> : null }
          </form>
        )}
      </Formik>
      <h2>Not yet signed in?</h2>
      <button id="signIn-button"><Link to="SignIn">Sign In</Link></button>
    </div>
  )}


export default Login