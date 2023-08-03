import {createContext, useContext, useState} from 'react'

interface IGlobalData {
    accessToken?: string;

}

interface IGlobalContextProps {
    globalData: IGlobalData;
    setGlobalData: (globalData: IGlobalData) => void
}
const GlobalContext = createContext({} as IGlobalContextProps);

interface IGlobalProviderProps {
    children: React.ReactNode
}

export const GlobalProvider = ({children}: IGlobalProviderProps) => {
    const [globalData, setGlobalData] = useState<IGlobalData>({});
    return (
        <GlobalContext.Provider value={{globalData, setGlobalData}}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    const {globalData, setGlobalData} = useContext(GlobalContext);

    const setAccessToken = (accessToken: string) => {
        setGlobalData({...globalData, accessToken})
    }

    return {
        accessToken: globalData?.accessToken,
        setAccessToken
    }
}