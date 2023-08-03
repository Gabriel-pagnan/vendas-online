import axios from "axios";
import { useState } from "react"

export const useRequests = () => {
    const [loading, setLoading] = useState<boolean>(false);


    const getRequest = async (url: string) => {
        setLoading(true)
        return await axios.get(url)
            .then((result) => {return result.data})
            .catch(() => alert('Erro'))
    }
    const postRequest = async (url: string, email: string, password: string) => {
        setLoading(true)
        const data =  await axios.post(url, {email, password})
            .then((result) => {return result.data})
            .catch(() => alert('Erro'))
        setLoading(false)
        return data
    }

    return {
        loading,
        getRequest,
        postRequest
    }
}