import React from 'react'
import "./Label.css"
import { AiOutlinePlus } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi'
const Label = ({ labelText, ticketCount, children }) => {
  return (
    <div className='label'>
      <div className='labelIcons'>
        {children}
        <p>{labelText}<span>{ticketCount}</span></p>
      </div>
      <div className='icons'>
        <AiOutlinePlus />
        <FiMoreHorizontal />
      </div>
    </div>
  )
}

export default Label