import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client'
import {LOGIN} from '../graphql/mutations'
 
 const Login = ({setToken}) => {

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if(result.data){
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
    }
  }, [result.data, setToken])

  return(
   <div>
     <h1>Login</h1>
     <Formik
       initialValues={{ username: '', password: '' }}
       onSubmit={({username, password}, {resetForm}) => {
         login({ variables: {username, password}})
         resetForm({values: {username: '', password: ''}})
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit
         /* and other goodies */
       }) => (
         <form onSubmit={handleSubmit}>
           username: <input
             type="text"
             name="username"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.username}
           />

           <br/>

           password: <input
           type= "password"
           name="password"
           onChange={handleChange}
           onBlur={handleBlur}
           value={values.password}
           />
           <br/>
           <button type="submit">
             Submit
           </button>
         </form>
       )}
     </Formik>
   </div>
  )};
 

export default Login