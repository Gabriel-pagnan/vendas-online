import axios from "axios";
import { useState } from "react"
import { useGlobalContext } from "./useGlobalContext";
import { connectionAPIPost } from "../functions/connection/connetionAPI";
import { URL_AUTH } from "../constants/urls";
import { ERROR_INVALID_PASSWORD } from "../constants/errorsStatus";
import { useNavigate } from "react-router-dom";
import { setAuthorizationToken } from "../functions/connection/auth";
import { PathEnum } from "../enums/paths.enum";
import { AuthType } from "../../modules/login/types/AuthType";

export const useRequests = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const {setNotification, setUser} = useGlobalContext();
    const navigate = useNavigate();

    const getRequest = async (url: string) => {
        setLoading(true)
        return await axios.get(url)
            .then((result) => {return result.data})
            .catch(() => alert('Erro'))
    }
    
    const postRequest = async <T>(url: string, body: unknown): Promise<T | undefined> => {
        setLoading(true)
        const data =  await connectionAPIPost<T>(url, body)
            .then((result) => {return result})
            .catch((error: Error) => {
                setNotification(error.message, 'error')
                return undefined
            });

        setLoading(false)
        
        return data
    }

    const authRequest = async (body: unknown): Promise<void> => {
        setLoading(true);
        await connectionAPIPost<AuthType>(URL_AUTH, body)
            .then((result) => {
                setUser(result.user)
                setAuthorizationToken(result.access_token)
                navigate(PathEnum.PRODUCT)
                return result
            })
            .catch(() => { setNotification(ERROR_INVALID_PASSWORD, 'error') });

        setLoading(false)
    }

    return {
        loading,
        getRequest,
        postRequest,
        authRequest
    }
}