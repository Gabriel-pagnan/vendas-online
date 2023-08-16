import { useEffect, useState } from "react";
import { URL_PRODUCT, URL_PRODUCT_ID } from "../../../shared/constants/urls";
import { InsertProductDTO } from "../../../shared/dtos/insert-product.dto";
import { PathEnum } from "../../../shared/enums/paths.enum";
import { useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../../../store/reducers/globalReducer/useGlobalReducer";
import { useProductReducer } from "../../../store/reducers/productReducer/useProductReducer";
import { useRequests } from "../../../shared/hooks/useRequests";
import { MethodsEnum } from "../../../shared/enums/methods.enum";

const DEFAULT_PRODUCT = {
    name: '',
    price: 0,
    image: '',
    weight: 0,
    height: 0,
    length: 0,
    width: 0,
    diameter: 0
}

export const useInsertProduct = (productId?: string) => {
    const navigate = useNavigate();
    const { setNotification } = useGlobalReducer();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [loadingProduct, setLoadingProduct] = useState(false);
    const { request, loading } = useRequests();
    const [disabledButton, setDisabledButton] = useState<boolean>(true);
    const [product, setProduct] = useState<InsertProductDTO>(DEFAULT_PRODUCT);
    const { product: productReducer, setProduct: setProductReducer } = useProductReducer();

    useEffect(() => {
        if (product.name && product.categoryId && product.image && product.price > 0) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        }
    }, [product]);

    useEffect(() => {
        if (productReducer) {
            setProduct({
                name: productReducer.name,
                price: productReducer.price,
                image: productReducer.image,
                weight: productReducer.weight,
                height: productReducer.height,
                length: productReducer.length,
                width: productReducer.width,
                diameter: productReducer.diameter,
            })
        }
    }, [productReducer])

    useEffect(() => {
        const findProduct = async () => {
            setLoadingProduct(true);
            await request(URL_PRODUCT_ID.replace('{productId}', `${productId}`), MethodsEnum.GET, setProductReducer)
            setLoadingProduct(false);
        };

        if (productId) {
            setIsEdit(true)
            findProduct();
        } else {
            setProductReducer(undefined);
            setProduct(DEFAULT_PRODUCT);
        }
    }, [productId])

    const handleSave = async () => {
        if (productId) {
            await request(URL_PRODUCT_ID.replace('{productId}', productId), MethodsEnum.PUT, undefined, product)
                .then(() => {
                    setNotification('Produto atualizado.', 'success')
                    navigate(PathEnum.PRODUCT)
                })
                .catch((error: Error) => { setNotification(error.message, 'error') });
        } else {
            await request(URL_PRODUCT, MethodsEnum.POST, undefined, product)
                .then(() => {
                    setNotification('Produto cadastrado.', 'success')
                    navigate(PathEnum.PRODUCT)
                })
                .catch((error: Error) => { setNotification(error.message, 'error') });
        }
    }

    const handleCancel = () => {
        navigate(PathEnum.PRODUCT);
    }

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>, nameObject: string, isNumber?: boolean) => {
        setProduct({
            ...product,
            [nameObject]: isNumber ? Number(e.target.value) : e.target.value
        })
    }

    const handleChangeSelect = (value: string) => {
        setProduct({ ...product, categoryId: Number(value) })
    };

    return {
        isEdit,
        product,
        loading,
        handleSave,
        handleCancel,
        onChangeInput,
        loadingProduct,
        productReducer,
        disabledButton,
        handleChangeSelect,
    }

}
