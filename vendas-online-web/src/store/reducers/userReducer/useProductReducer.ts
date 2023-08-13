import { setUsersActions } from ".";
import { UserType } from "../../../modules/login/types/UserType";
import { useAppSelector } from "../../hooks"
import {useDispatch} from 'react-redux'

export const useUserReducer = () => {
    const dispatch = useDispatch();
    const {users} = useAppSelector((state) => state.userReducer);

    const setUsers = (currentUsers: UserType[]) => {
        dispatch(setUsersActions(currentUsers))
    } 

    return {
        users,
        setUsers
    }
}