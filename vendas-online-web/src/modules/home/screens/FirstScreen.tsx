import { Spin } from "antd"
import { useEffect } from "react"
import { getAuthorizationToken } from "../../../shared/functions/connection/auth"
import { useNavigate } from "react-router-dom"

export const FirstScreen = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = getAuthorizationToken();

        if(token) {
            navigate('/product')
        }else{
            navigate('/login')
        }

    }, [])

    return (
        <Spin tip="Loading" size="large">
            <div className="content" />
        </Spin>
    )
}