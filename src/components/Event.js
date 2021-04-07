import React from 'react'
import { useQuery } from '@apollo/client'
import { useParams} from 'react-router-dom'
import {EVENT} from '../graphql/queries'

const Event = () => {
  const id = useParams().id
  const event = useQuery(EVENT, {variables: {id}})

  if(!event.data){
    return(
      <div>
        ...loading
      </div>
    )
  }

  return(
    <div>
      {event.data.event.name}
    </div>
  )
}

export default Event