import axios from "axios";
import { useState } from "react"
import { useGlobalContext } from "./useGlobalContext";
import { connectionAPIPost } from "../functions/connection/connetionAPI";

export const useRequests = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const {setNotification} = useGlobalContext();

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
        console.log(data);
        
        return data
    }

    return {
        loading,
        getRequest,
        postRequest
    }
}