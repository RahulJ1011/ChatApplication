import React, { useEffect, useState } from 'react'
import Avatar from './Avatar';

const Chat = () => {
    const [ws,SetWs] = useState(null);
    const [onlinePeople,SetOnlinePeople] = useState({})
    useEffect(()=> {
        new WebSocket('ws://localhost:4000')
        SetWs(ws)
        ws.addEventListener('message',handleMessage);
    },[])
    function showOnlinePeople(peopleArray)
    {
       const people = new Set();
       peopleArray.forEach(person=> {
        people.add(person)
       })
       console.log(people)
       SetOnlinePeople(people)
    }
    const handleMessage = (e)=>
    {
        const messageData = JSON.parse(e.data);
        console.log(messageData);
        if('online' in messageData)
        {
            showOnlinePeople(messageData.online);
        }
        
    }
  return (
    <div className='flex h-screen'>
    <div className='bg-white  w-1/3 pl-2 pt-4'>
    <div className='text-blue-600 font-bold flex gap-2 mb-4'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
</svg>

        Chat
        </div>
        {Object.keys(onlinePeople).map(person => (
            <div className='border-b border-gray-100 py-2 flex items-center gap-2'>
                
                   
                    
                    <Avatar userName={onlinePeople[userId]} userId={userId} />
                    <span> {onlinePeople[person]} </span>
               
                </div>
        ))}
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
