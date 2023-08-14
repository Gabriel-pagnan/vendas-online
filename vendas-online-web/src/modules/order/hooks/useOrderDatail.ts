import { useEffect } from "react"
import { useRequests } from "../../../shared/hooks/useRequests";
import { URL_ORDER_ID } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { useOrderReducer } from "../../../store/reducers/orderReducer/useProductReducer";

export const useOrderDetail = (orderId?: string) => {
    const {request, loading} = useRequests();
    const {order, setOrder} = useOrderReducer();    

    useEffect(() => {
        request(URL_ORDER_ID.replace('{orderId}', orderId || ''), MethodsEnum.GET, setOrder)
    }, []);

    return {
        order,
        loading
    }
}