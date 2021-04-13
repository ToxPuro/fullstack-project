import { Formik } from "formik"
import { Link } from "react-router-dom"
import React from "react"

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
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit
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
            <button type="submit" id="login-button">
             Login
            </button>
          </form>
        )}
      </Formik>
      <h2>Not yet signed in?</h2>
      <button id="signIn-button"><Link to="SignIn">Sign In</Link></button>
    </div>
  )}


export default Login