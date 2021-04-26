import React, { useState } from "react"
import { Formik } from "formik"
import axios from "axios"
import { Image } from "cloudinary-react"


const SignIn = () => {
  const [imageID, setImageID] = useState(null)
  const onSubmit = async ({ image }) => {
    console.log(image.type)
    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset", "ml_default")
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dfayht8i9/image/upload",
      formData,
    )
    setImageID(response.data.public_id)
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
      {imageID ? <Image cloudName="dfayht8i9" publicId={imageID}/> : null}
    </div>
  )}


export default SignIn