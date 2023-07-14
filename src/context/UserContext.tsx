import {  createContext, useState, useContext } from "react";
interface Props {
    children: React.ReactNode;
  }
type ContextType = {
    user: boolean;
    setUser: React.Dispatch<React.SetStateAction<boolean>>;
}
const Context = createContext<ContextType>({} as ContextType)

const ContextProvider: React.FC<Props> =({children}) => {
    const [user, setUser] = useState<boolean>(false)

    return(
        <Context.Provider value={{user, setUser}}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;

export const useUser = () => useContext(Context)