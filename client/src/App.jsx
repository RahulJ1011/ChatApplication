import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import axios from 'axios'
import {UserContext, userContextProvider} from "./UserContext"
import Routes from './Routes'
function App() {


  axios.defaults.baseURL = 'http://localhost:4000'
  axios.defaults.withCredentials = true;
  const {userName} = useContext(UserContext);
  console.log(userName)

  return (
    <userContextProvider>
     <Routes />
    </userContextProvider>
  )
}

export default App
