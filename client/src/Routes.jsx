import { useContext } from "react";
import { UserContext } from "./UserContext";
import Register from "./RegisterandLogin";

export default function Routes()
{
    const {userName,id} = useContext(UserContext);
    if(userName)
    {
        return 'logged in';
    }

    return (
        <Register />
    )
}