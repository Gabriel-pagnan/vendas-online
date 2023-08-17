import { setCategoriesActions, setCategoryActions } from ".";
import { CategoryType } from "../../../shared/types/CategoryTypes";
import { useAppSelector } from "../../hooks";
import {useDispatch} from 'react-redux'

export const useCategoryReducer = () => {
    const dispatch = useDispatch();
    const {categories, category} = useAppSelector((state) => state.categoryReducer);

    const setCategories = (currentCategories: CategoryType[]) => {
        dispatch(setCategoriesActions(currentCategories))
    } 
    const setCategory = (currentCategory: CategoryType) => {
        dispatch(setCategoryActions(currentCategory))
    } 

    return {
        category,
        categories,
        setCategory,
        setCategories,
    }
}