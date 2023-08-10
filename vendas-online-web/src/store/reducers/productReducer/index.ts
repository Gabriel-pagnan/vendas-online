import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductType } from '../../../shared/types/ProductType'

interface ProductState {
    products: ProductType[]
}

const initialState: ProductState = {
    products: [],
}

export const counterSlice = createSlice({
    name: 'productReducer',
    initialState,
    reducers: {
        setProductsActions: (state, action: PayloadAction<ProductType[]>) => {
            state.products = action.payload
        },
    },
})

export const { setProductsActions } = counterSlice.actions

export default counterSlice.reducer