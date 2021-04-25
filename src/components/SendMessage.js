import React from "react"
import { Formik } from "formik"
import { useMutation } from "@apollo/client"
import { SEND_USER_MESSAGE } from "../graphql/mutations"




const SendMessage = () => {
  const [sendMessage] = useMutation(SEND_USER_MESSAGE)
  const onSubmit = ({ receivers, title, message }) => {
    let receiversList = receivers.split(",")
    receiversList = receiversList.map(receiver => receiver.replace(/(^[ '^$*#&]+)|([ '^$*#&]+$)/g, ""))
    console.log(receiversList<)
    sendMessage({ variables: { receivers: receiversList, message, title } })
  }
  return(
    <div>
      <h1>Send Message</h1>
      <div>
        <Formik
          initialValues={{ receivers: "", message: "", title: "" }}
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
            title: <input
                id="title"
                type="text"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              <br/>
              message:
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