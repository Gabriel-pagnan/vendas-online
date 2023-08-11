import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OrderType } from '../../../shared/types/OrderType'

interface OrderState {
    orders: OrderType[],
    order?: OrderType 
}

const initialState: OrderState = {
    orders: [],
    order: undefined
}

export const counterSlice = createSlice({
    name: 'orderReducer',
    initialState,
    reducers: {
        setOrdersActions: (state, action: PayloadAction<OrderType[]>) => {
            state.orders = action.payload
        },
        setOrderActions: (state, action: PayloadAction<OrderType>) => {
            state.order = action.payload
        },
    },
})

export const { setOrdersActions, setOrderActions } = counterSlice.actions

export default counterSlice.reducer