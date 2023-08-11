import { useEffect } from "react";
import { useOrderReducer } from "../../../store/reducers/orderReducer/useProductReducer"
import { useRequests } from "../../../shared/hooks/useRequests";
import { URL_ORDER_ALL } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/methods.enum";

export const useOrder = () => {
    const {orders, setOrders} = useOrderReducer();
    const {request} = useRequests();

    useEffect(() => {
        if(!orders || orders.length === 0) {
            request(URL_ORDER_ALL, MethodsEnum.GET, setOrders)
        }
    }, [])

    return{
        orders
    }
}