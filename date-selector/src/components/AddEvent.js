import React from 'react';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client'
import { ADD_EVENT } from '../graphql/mutations'

 const AddEvent = () => {
   const [addEvent ] = useMutation(ADD_EVENT)
   return( 
   <div>
     <h1>New Event</h1>
     <Formik
       initialValues={{ name: '' }}
       onSubmit={({name}, {resetForm}) => {
         addEvent({variables:{name}})
         resetForm({})
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
           event name: <input
             type="text"
             name="name"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.name}
           />
           <button type="submit">
             Submit
           </button>
         </form>
       )}
     </Formik>
   </div>
 )};
 

export default AddEvent