import { useContext } from "react";
import { RerenderContext } from "../contexts/index";

const useRerender=()=>{

    const {refreshKey, reRenderComponent}=useContext(RerenderContext);
    return {refreshKey, reRenderComponent};
}

export {useRerender};