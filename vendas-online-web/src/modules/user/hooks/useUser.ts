import { useEffect } from "react";
import { useRequests } from "../../../shared/hooks/useRequests";
import { useUserReducer } from "../../../store/reducers/userReducer/useProductReducer"
import { URL_USER_ALL } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { useNavigate } from "react-router-dom";
import { PathEnum } from "../../../shared/enums/paths.enum";

export const useUser = () => {
    const {users, setUsers} = useUserReducer();
    const {request, loading} = useRequests();
    const navigate = useNavigate();

    useEffect(() => {
        request(URL_USER_ALL, MethodsEnum.GET, setUsers)
    }, [])

    const handleClickInsert = () => {
        navigate(PathEnum.USER_INSERT)
    }

    return {
        users,
        loading,
        handleClickInsert,
    }
}