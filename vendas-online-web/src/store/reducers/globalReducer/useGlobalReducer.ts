import { setNotificationAction, setUserAction } from ".";
import { UserType } from "../../../modules/login/types/UserType";
import { Notification } from "../../../shared/types/NotificationTypes";
import { useAppSelector } from "../../hooks";
import {useDispatch} from 'react-redux'

export const useGlobalReducer = () => {
    const dispatch = useDispatch();
    const {notification, user} = useAppSelector((state) => state.globalReducer);

    const setNotification = (message: string, type: Notification, description?: string) => {
        dispatch(setNotificationAction({
            message,
            type,
            description
        }))
    }

    const setUser = (user: UserType) => {
        dispatch(setUserAction(user))
    }

    return {
        user, 
        setUser,
        notification,
        setNotification
    }
}