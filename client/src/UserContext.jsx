import axios from "axios";
import { createContext,useEffect,useState } from "react";

export const UserContext = createContext({});

export function userContextProvider({children})
{
    const [userName,SetUserName] = useState(null);
    const [Id,setId] = useState(null);
const[id,SetId] = useState(null)
    useEffect(()=> {
        axios.get('/profile').then(res => {
            console.log(res.data)
            SetUserName(res.data.userName);
            setId(res.data._id)
        })
    },[])
    return (
        <UserContext.Provider value={{userName,SetUserName,id,SetId}}>
            {children}
            </UserContext.Provider>

    )
}