import { useContext } from "react";
import { UserContext } from "./UserContext";
import Register from "./RegisterandLogin";
import Chat from "./Chat";

export default function Routes()
{
    const {userName,id} = useContext(UserContext);
    if(userName)
    {
        return <Chat />
    }

    return (
        <Register />
    )
}