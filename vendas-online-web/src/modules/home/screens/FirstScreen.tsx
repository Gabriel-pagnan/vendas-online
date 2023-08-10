import { Spin } from "antd"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { PathEnum } from "../../../shared/enums/paths.enum"
import { useGlobalReducer } from "../../../store/reducers/globalReducer/useGlobalReducer"

export const FirstScreen = () => {
    const {user} = useGlobalReducer()
    const navigate = useNavigate();

    useEffect(() => {
        if(user) navigate(PathEnum.PRODUCT)
    }, [user])

    return (
        <Spin tip="Loading" size="large">
            <div className="content" />
        </Spin>
    )
}