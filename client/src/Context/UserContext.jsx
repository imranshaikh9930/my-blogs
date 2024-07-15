import { createContext,useState } from "react";


export const UserContext = createContext();

const useContextProvider = ({children})=>{
    const [isUser,setIsUser] = useState(false);
    const [userInfo,setUserInfo] = useState({});
    return (
        <UserContext.Provider value={{userInfo,setUserInfo,setIsUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default useContextProvider;