import React from 'react'
import "./Label.css"
const Label = ({labelText, ticketCount}) => {
  return (
    <div>
        <p>{labelText}, {ticketCount}</p>
    </div>
  )
}

export default Label