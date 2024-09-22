import axios from "axios";
import { createContext,useEffect,useState } from "react";

export const UserContext = createContext({});

export function userContextProvider({children})
{
    const [userName,SetUserName] = useState(null);
const[id,SetId] = useState(null)
    useEffect(()=> {
        axios.get('/profile',{withCredentials:true}).then(res => {
            console.log(res.data)
        })
    },[])
    return (
        <UserContext.Provider value={{userName,SetUserName,id,SetId}}>
            {children}
            </UserContext.Provider>

    )
}