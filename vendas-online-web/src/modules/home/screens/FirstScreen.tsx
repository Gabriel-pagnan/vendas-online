import { Spin } from "antd"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { PathEnum } from "../../../shared/enums/paths.enum"
import { useGlobalContext } from "../../../shared/hooks/useGlobalContext"

export const FirstScreen = () => {
    const {user} = useGlobalContext()
    const navigate = useNavigate();

    useEffect(() => {
        if(user) navigate(PathEnum.PRODUCT)
    }, [])

    return (
        <Spin tip="Loading" size="large">
            <div className="content" />
        </Spin>
    )
}