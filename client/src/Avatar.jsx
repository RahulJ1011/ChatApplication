import React from 'react'

const Avatar = ({userId,userName}) => {
  return (
    <div className='w-8 h-8 bg-red-200 rounded-full text-center flex items-center'>
      <div className='text-center'>
      {userName[0]}
      </div>
    </div>
  )
}

export default Avatar
