import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CategoryType } from '../../../shared/types/CategoryTypes'

interface CategoryState {
    categories: CategoryType[],
    category?: CategoryType
}

const initialState: CategoryState = {
    categories: [],
    category: undefined
}

export const counterSlice = createSlice({
    name: 'productReducer',
    initialState,
    reducers: {
        setCategoriesActions: (state, action: PayloadAction<CategoryType[]>) => {
            state.categories = action.payload
        },
        setCategoryActions: (state, action: PayloadAction<CategoryType | undefined>) => {
            state.category = action.payload
        },
    },
})

export const { setCategoriesActions, setCategoryActions } = counterSlice.actions

export default counterSlice.reducer