import { setOrdersActions } from ".";
import { OrderType } from "../../../shared/types/OrderType";
import { useAppSelector } from "../../hooks"
import {useDispatch} from 'react-redux'

export const useOrderReducer = () => {
    const dispatch = useDispatch();
    const {orders} = useAppSelector((state) => state.orderReducer);

    const setOrders = (currentProducts: OrderType[]) => {
        dispatch(setOrdersActions(currentProducts))
    } 

    return {
        orders,
        setOrders
    }
}