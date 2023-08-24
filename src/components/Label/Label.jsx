import React from 'react'
import "./Label.css"
import {AiOutlinePlus} from 'react-icons/ai';
import {FiMoreHorizontal} from 'react-icons/fi'
const Label = ({labelText, ticketCount}) => {
  return (
    <div className='label'>
        <p>{labelText}<span>{ticketCount}</span></p>
        <div className='icons'>
          <AiOutlinePlus/>
          <FiMoreHorizontal/>
        </div>
    </div>
  )
}

export default Label