import React, { useContext, useState } from 'react'
import axios from 'axios'
import { UserContext } from './UserContext.jsx'
const Register = () => {
  const [userName,SetUsername] = useState('')
  const [password,SetPassword] = useState('')
  const{SetUserName:setLoggedInUserName,SetId}=useContext(UserContext)
  const handleSubmit = async(e)=>
  {
    e.preventDefault();
    try
    {
    const res =  await axios.post('/register',{userName,password})
    console.log(res);
    setLoggedInUserName(res.data.userName);
    SetId(res.data._id)
    }
    catch(err)
    {
      console.log(err);
      
    }
  }
  return (
    <div className='bg-gray-600 text-black h-screen flex items-center'>
      <form className='w-64 mx-auto mb-12 ' onSubmit={handleSubmit}>
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
