import React, {useState} from 'react';
import { Formik } from 'formik';
import { useMutation, useQuery } from '@apollo/client'
import { ADD_EVENT} from '../graphql/mutations'
import {USER_GROUPS} from '../graphql/queries'
import Select from 'react-select'

 const AddEvent = () => {

  const [choice, setChoice] = useState(null)
  const handleChoice = selectedOption => {
    setChoice(selectedOption.value)
  }
   const groups = useQuery(USER_GROUPS)
   let options = []
   if(groups.data){
    options = groups.data.userGroups.map(group =>(
      {value: group.name, label: group.name}
    ))
   }
   const [addEvent ] = useMutation(ADD_EVENT)
   return( 
   <div>
     <h1>New Event</h1>
     <Formik
       initialValues={{ name: '' }}
       onSubmit={({name}, {resetForm}) => {
         addEvent({variables:{name, group: choice}})
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
     <Select options={options} onChange={handleChoice} />
   </div>
 )};
 

export default AddEvent