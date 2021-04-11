import React, { useEffect } from "react"
import { Formik } from "formik"
import { useMutation } from "@apollo/client"
import { LOGIN, SIGN_IN } from "../graphql/mutations"

const SignIn = ({ setToken }) => {

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
    }
  })

  const [ signIn ] = useMutation(SIGN_IN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if(result.data){
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem("user-token", token)
    }
  }, [result.data, setToken])

  return(
    <div>
      <h1>Sign In</h1>
      <Formik
        initialValues={{ username: "", password: "", name: "" }}
        onSubmit={async ({ username, name, password }, { resetForm }) => {
          await signIn({ variables: { username, name,  password } })
          login({ variables: { username, password } })
          resetForm({ values: { username: "", password: "", name: "" } })
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
              type= "password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <br/>
            <button type="submit" id="login-button">
             Sign In
            </button>
          </form>
        )}
      </Formik>
    </div>
  )}


export default SignIn