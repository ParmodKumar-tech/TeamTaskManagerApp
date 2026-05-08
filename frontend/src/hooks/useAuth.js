import { useContext } from "react";
import { AuthContext } from "../contexts/index";

const useAuth=()=>{

const {userName,setUserName,userId,setUserId,setRole,role} = useContext(AuthContext);

return {userName,setUserName,userId,setUserId,setRole,role};
}

export {useAuth};