import { Formik } from "formik"
import { Link } from "react-router-dom"
import React from "react"
import * as yup from "yup"

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username needs to be atleast 3 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password needs to be atleast 8 characters")

})

const Test = () => {
  const list = [{ m:"Hei" },{ m:"Hey" }, { m: "Hi" }]
  return ( <div> { list.map(elem => (<div key={elem.m}> {elem.m} </div>)) } </div> )

}

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
      <Test/>
    </div>
  )}


export default Login