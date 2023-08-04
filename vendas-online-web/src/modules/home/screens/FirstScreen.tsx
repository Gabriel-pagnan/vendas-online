import { Spin } from "antd"
import { useEffect } from "react"
import { getAuthorizationToken, unsetAuthorizationToken } from "../../../shared/functions/connection/auth"
import { useNavigate } from "react-router-dom"
import { PathEnum } from "../../../shared/enums/paths.enum"
import { connectionAPIGet } from "../../../shared/functions/connection/connetionAPI"
import { URL_USER } from "../../../shared/constants/urls"

export const FirstScreen = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            const token = getAuthorizationToken();            
            if (token) {
                await connectionAPIGet(URL_USER)
                    .then(() => {                         
                        navigate(PathEnum.PRODUCT) 
                    })
                    .catch(() => { 
                        // unsetAuthorizationToken()
                        navigate(PathEnum.LOGIN) 
                    })
            } else {
                navigate(PathEnum.LOGIN)
            }
        }
        verifyToken()

    }, [])

    return (
        <Spin tip="Loading" size="large">
            <div className="content" />
        </Spin>
    )
}