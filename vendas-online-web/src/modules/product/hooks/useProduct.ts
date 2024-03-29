import { useNavigate } from "react-router-dom";
import { PathEnum } from "../../../shared/enums/paths.enum";
import { useEffect, useState } from "react";
import { useRequests } from "../../../shared/hooks/useRequests";
import { useProductReducer } from "../../../store/reducers/productReducer/useProductReducer";
import { ProductType } from "../../../shared/types/ProductType";
import { URL_PRODUCT, URL_PRODUCT_ID } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { useGlobalReducer } from "../../../store/reducers/globalReducer/useGlobalReducer";

export const useProduct = () => {
    const navigate = useNavigate();   
    const { request } = useRequests();
    const { setNotification } = useGlobalReducer();
    const {products, setProducts} = useProductReducer();
    const [filterProduct, setFilterProduct] = useState<ProductType[]>([]);
    const [productIdDelete, setProductIdDelete] = useState<number | undefined>();

    useEffect(() => {
        setFilterProduct([...products])
    }, [products]);

    const onSearch = (value: string) => {
        setFilterProduct([
            ...filterProduct.filter((product) => product.name.toUpperCase().includes(value.toUpperCase()))
        ])
    }

    useEffect(() => {
        request<ProductType[]>(URL_PRODUCT, MethodsEnum.GET, setProducts)
    }, [])

    const handleClickInsert = () => {
        navigate(PathEnum.PRODUCT_INSERT)
    }

    const handleDelete = async () => {
        await request(URL_PRODUCT_ID.replace('{productId}', `${productIdDelete}`), MethodsEnum.DELETE)
            .then(() => {
                setNotification('Produto deletado.', 'warning')
            })
            .catch((error: Error) => { setNotification(error.message, 'error') });

        await request<ProductType[]>(URL_PRODUCT, MethodsEnum.GET, setProducts);
        setProductIdDelete(undefined);
    }

    const handleEdit = async (productId: number) => {
        navigate(PathEnum.PRODUCT_EDIT.replace(':productId', `${productId}`))
        
    }

    const handleCloseModal = () => {
        setProductIdDelete(undefined);
    };

    const handleOpenModal = (productId: number) => {
        setProductIdDelete(productId);
    };

    return {
        onSearch,
        handleEdit,
        handleDelete,
        filterProduct,
        productIdDelete,
        handleOpenModal,
        handleCloseModal,
        handleClickInsert,
        openModalDelete: !!productIdDelete,
    }
}