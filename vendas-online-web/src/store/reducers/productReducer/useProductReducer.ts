import { setProductsActions } from ".";
import { ProductType } from "../../../shared/types/ProductType";
import { useAppSelector } from "../../hooks"
import {useDispatch} from 'react-redux'

export const useProductReducer = () => {
    const dispatch = useDispatch();
    const {products} = useAppSelector((state) => state.productReducer);

    const setProducts = (currentProducts: ProductType[]) => {
        dispatch(setProductsActions(currentProducts))
    } 

    return {
        products,
        setProducts
    }
}