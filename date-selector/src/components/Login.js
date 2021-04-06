import React from 'react';
import { Formik } from 'formik';
 
 const AddEvent = () => (
   <div>
     <h1>Login</h1>
     <Formik
       initialValues={{ username: '', password: '' }}
       onSubmit={(values, {resetForm}) => {
         console.log(values)
         resetForm({values: {name: '', password: ''}})
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
             name="name"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.name}
           />

           <br/>

           password: <input
           type= "text"
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
 );
 

export default AddEvent