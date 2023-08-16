import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductType } from '../../../shared/types/ProductType'

interface ProductState {
    products: ProductType[];
    product?: ProductType
}

const initialState: ProductState = {
    products: [],
    product: undefined
}

export const counterSlice = createSlice({
    name: 'productReducer',
    initialState,
    reducers: {
        setProductsActions: (state, action: PayloadAction<ProductType[]>) => {
            state.products = action.payload
        },
        setProductActions: (state, action: PayloadAction<ProductType | undefined>) => {
            state.product = action.payload
        },
    },
})

export const { setProductsActions, setProductActions } = counterSlice.actions

export default counterSlice.reducer