import { setProductActions, setProductsActions } from ".";
import { ProductType } from "../../../shared/types/ProductType";
import { useAppSelector } from "../../hooks"
import {useDispatch} from 'react-redux'

export const useProductReducer = () => {
    const dispatch = useDispatch();
    const {products, product} = useAppSelector((state) => state.productReducer);

    const setProducts = (currentProducts: ProductType[]) => {
        dispatch(setProductsActions(currentProducts))
    };
    const setProduct = (currentProduct?: ProductType) => {
        dispatch(setProductActions(currentProduct))
    } 

    return {
        product,
        products,
        setProduct,
        setProducts,
    }
}