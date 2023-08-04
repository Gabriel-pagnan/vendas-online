import { createContext, useContext, useState } from 'react'
import {UserType} from '../../modules/login/types/UserType'

type NotificationTypes = 'success' | 'info' | 'warning' | 'error'

interface INotificationProps {
    message: string,
    type: NotificationTypes,
    description?: string
}

interface IGlobalData {
    notification?: INotificationProps,
    user?: UserType
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

    const setUser = (user: UserType) => {
        setGlobalData({
            ...globalData,
            user
        })
    }

    return {
        notification: globalData?.notification,
        user: globalData?.user,
        setUser,
        setNotification,
    }
}