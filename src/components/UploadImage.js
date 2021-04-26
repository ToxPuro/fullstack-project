import React from "react"
import { Formik } from "formik"


const SignIn = () => {
  const onSubmit = async ({ image }) => {
    console.log(image.name, image.type, image.size )
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