import React, { useEffect } from "react"
import { Formik } from "formik"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../graphql/mutations"
import { Link, useHistory } from "react-router-dom"

const Login = ({ setToken }) => {
  const history = useHistory()
  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
    }
  })
  useEffect(() => {
    if(result.data){
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem("user-token", token)
      history.push("/")
    }
  }, [result.data, setToken])

  return(
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={({ username, password }, { resetForm }) => {
          login({ variables: { username, password } })
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
      <button><Link to="SignIn">Sign In</Link></button>
    </div>
  )}


export default Login