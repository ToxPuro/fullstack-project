import React from "react"
import { Formik } from "formik"


const onSubmit = (values) => {
  console.log(values)
}

const SendMessage = () => {
  return(
    <div>
      <h1>Send Message</h1>
      <div>
        <Formik
          initialValues={{ receivers: "", message: "" }}
          onSubmit={onSubmit}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
          /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
           receivers: <input
                id="receivers"
                type="text"
                name="receivers"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.receivers}
              />
              <br/>

              <textarea
                id="message"
                name="message"
                onChange={handleChange}
                onBlur = {handleBlur}
                value={values.message}/>
              { (isValid) ?             <button type="submit" id="submit-button">
             Send
              </button> : null}
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default SendMessage