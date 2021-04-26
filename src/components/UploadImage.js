import React from "react"
import { Formik } from "formik"
import axios from "axios"


const SignIn = () => {
  const onSubmit = async ({ image }) => {
    console.log(image.type)
    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset", "ml_default")
    try{
      await axios.post(
        "https://api.cloudinary.com/v1_1/dfayht8i9/image/upload",
        formData,
      )
    } catch(error){
      console.log(error)
    }
  }







  return(
    <div>
      <h1>Sign In</h1>
      <Formik
        initialValues={{ image: null }}
        onSubmit={onSubmit}
      >
        {({
          setFieldValue,
          handleSubmit,
          isValid,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>

           file: <input
              id="image"
              type= "file"
              name="image"
              onChange={(event) => {
                setFieldValue("image", event.currentTarget.files[0])
              }}
            />
            <br/>
            { (isValid) ?             <button type="submit" id="submit-button">
             Submit
            </button> : null}
          </form>
        )}
      </Formik>
    </div>
  )}


export default SignIn