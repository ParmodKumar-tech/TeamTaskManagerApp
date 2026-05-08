import { useState } from "react";
import { RerenderContext } from "../contexts";


const RerenderProvider =({children})=>{
    const [refreshKey, setRefreshKey] = useState(0);
    
    const reRenderComponent = () => {
    setRefreshKey((prev) => prev + 1);
    };

    return (
        <RerenderContext.Provider value={{refreshKey, reRenderComponent}}>{children}</RerenderContext.Provider>
    )
}

export {RerenderProvider}