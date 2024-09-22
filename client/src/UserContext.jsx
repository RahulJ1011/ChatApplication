import { createContext,useState } from "react";

export const UserContext = createContext({});
const [userName,SetUserName] = useState(null);
const[id,SetId] = useState(null)

export function userContextProvider({children})
{
    return (
        <UserContext.Provider value={{userName,SetUserName,id,SetId}}>
            {children}
            </UserContext.Provider>

    )
}