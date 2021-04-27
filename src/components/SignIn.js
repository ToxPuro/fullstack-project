import React from "react"
import { Formik } from "formik"
import * as yup from "yup"
import axios from "axios"

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3),
  name: yup
    .string()
    .required("Name is required")
    .min(3),
  password: yup
    .string()
    .required("Password is required")
    .min(8)

})

const SignIn = ({ login, signIn }) => {
  const onSubmit = async ({ username, name, password, image }, { resetForm }) => {
    let imageID = null
    if(image){
      const formData = new FormData()
      formData.append("file", image)
      formData.append("upload_preset", "ml_default")
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dfayht8i9/image/upload",
        formData,
      )
      imageID = response.data.public_id
    }
    const signInSuccessful = await signIn(username, name, password, imageID)
    console.log(signInSuccessful)
    if(signInSuccessful){
      await login({ username, password })
    }

    resetForm({ values: { username: "", password: "", name: "", image: null } })
  }







  return(
    <div>
      <h1>Sign In</h1>
      <Formik
        initialValues={{ username: "", password: "", name: "", image: null }}
        onSubmit={onSubmit}
        validationSchema = {validationSchema}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          isValid,
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

          image: <input
              id="image"
              type="file"
              name="image"
              onChange={(event) => {
                setFieldValue("image", event.currentTarget.files[0])
              }}/>
            <br/>
            { (isValid) ?             <button type="submit" id="submit-button">
             Sign In
            </button> : null}
          </form>
        )}
      </Formik>
    </div>
  )}


export default SignIn