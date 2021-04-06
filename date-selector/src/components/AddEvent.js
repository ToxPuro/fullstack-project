import React from 'react';
import { Formik } from 'formik';
 
 const AddEvent = () => (
   <div>
     <h1>New Event</h1>
     <Formik
       initialValues={{ name: '' }}
       onSubmit={(values, {resetForm}) => {
         console.log(values)
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
 );
 

export default AddEvent