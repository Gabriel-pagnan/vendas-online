import { setOrderActions, setOrdersActions } from ".";
import { OrderType } from "../../../shared/types/OrderType";
import { useAppSelector } from "../../hooks"
import {useDispatch} from 'react-redux'

export const useOrderReducer = () => {
    const dispatch = useDispatch();
    const {orders, order} = useAppSelector((state) => state.orderReducer);

    const setOrders = (orders: OrderType[]) => {
        dispatch(setOrdersActions(orders))
    } 
    const setOrder = (order: OrderType) => {
        dispatch(setOrderActions(order))
    } 

    return {
        orders,
        order,
        setOrders,
        setOrder
    }
}