import { setCategoriesActions } from ".";
import { CategoryType } from "../../../shared/types/CategoryTypes";
import { useAppSelector } from "../../hooks";
import {useDispatch} from 'react-redux'

export const useCategoryReducer = () => {
    const dispatch = useDispatch();
    const {categories} = useAppSelector((state) => state.categoryReducer);

    const setCategories = (currentProducts: CategoryType[]) => {
        dispatch(setCategoriesActions(currentProducts))
    } 

    return {
        categories,
        setCategories,
    }
}