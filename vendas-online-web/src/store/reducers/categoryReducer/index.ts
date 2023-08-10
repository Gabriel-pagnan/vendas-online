import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CategoryType } from '../../../shared/types/CategoryTypes'

interface CategoryState {
    categories: CategoryType[]
}

const initialState: CategoryState = {
    categories: [],
}

export const counterSlice = createSlice({
    name: 'productReducer',
    initialState,
    reducers: {
        setCategoriesActions: (state, action: PayloadAction<CategoryType[]>) => {
            state.categories = action.payload
        },
    },
})

export const { setCategoriesActions } = counterSlice.actions

export default counterSlice.reducer