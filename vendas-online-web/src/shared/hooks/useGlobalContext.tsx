import { createContext, useContext, useState } from 'react'

type NotificationTypes = 'success' | 'info' | 'warning' | 'error'

interface INotificationProps {
    message: string,
    type: NotificationTypes,
    description?: string
}

interface IGlobalData {
    accessToken?: string;
    notification?: INotificationProps
}

interface IGlobalContextProps {
    globalData: IGlobalData;
    setGlobalData: (globalData: IGlobalData) => void
}
const GlobalContext = createContext({} as IGlobalContextProps);

interface IGlobalProviderProps {
    children: React.ReactNode
}

export const GlobalProvider = ({ children }: IGlobalProviderProps) => {
    const [globalData, setGlobalData] = useState<IGlobalData>({});
    return (
        <GlobalContext.Provider value={{ globalData, setGlobalData }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    const { globalData, setGlobalData } = useContext(GlobalContext);

    const setAccessToken = (accessToken: string) => {
        setGlobalData({ ...globalData, accessToken })
    }
    const setNotification = (message: string, type: NotificationTypes, description?: string) => {
        setGlobalData({
            ...globalData,
            notification: {
                description,
                message,
                type
            }
        })
    }

    return {
        notification: globalData?.notification,
        accessToken: globalData?.accessToken,
        setAccessToken,
        setNotification
    }
}