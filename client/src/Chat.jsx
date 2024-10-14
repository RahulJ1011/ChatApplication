import React, { useEffect, useState } from 'react'

const Chat = () => {
    const [ws,SetWs] = useState(null);
    useEffect(()=> {
        new WebSocket('ws://localhost:4000')
        SetWs(ws)
        ws.addEventListener('message',handleMessage);
    },[])
    const handleMessage = (e)=>
    {
        console.log('new message',e);
    }
  return (
    <div className='flex h-screen'>
    <div className='bg-white  w-1/3'>
        contacts
    </div>
    <div className='flex flex-col bg-blue-50 w-2/3 p-2'>
        <div className='flex-grow'>
            messages with selected person
        </div>
        <div className='flex gap-2 mx-2'>
            <input 
            className='bg-white flex-grow border p-2'
            type="text" 
            placeholder="type a message"/>
            <button className='bg-blue-500 p-2 text-white'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
</svg>

            </button>
        </div>
    </div>
    </div>
  )
}

export default Chat
