import React, { useState } from 'react'

const Register = () => {
  const [userName,SetUsername] = useState('')
  const [password,SetPassword] = useState('')
  return (
    <div className='bg-gray-600 text-white h-screen flex item-center'>
      <form className='w-64 mx-auto '>
        <input 
        type='text'
        placeholder='username'
        className='block w-full rounded-sm p-2 mb-2'
        />
        <input 
        type='password'
        placeholder='password'
        className='block w-full rounded-sm p-2 mb-2'
        />
        <button
        className='bg-blue-500 text-white block w-full rounded-sm'
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Register
