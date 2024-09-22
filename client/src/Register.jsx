import React, { useState } from 'react'

const Register = () => {
  const [userName,SetUsername] = useState('')
  const [password,SetPassword] = useState('')
  return (
    <div className='bg-gray-600 text-white h-screen flex item-center'>
      <form className='w-64 mx-auto mb-12 '>
        <input 
        type='text'
        value={userName}
        onChange={(e) => SetUsername(e.target.value)}
        placeholder='username'
        className='block w-full rounded-sm p-2 mb-2'
        />
        <input 
        type='password'
        onChange={(e)=> SetPassword(e.target.value)}
        value={password}
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
