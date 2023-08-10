import { useEffect, useState } from "react";
import { connectionAPIPost } from "../../../shared/functions/connection/connetionAPI"
import { URL_PRODUCT } from "../../../shared/constants/urls";
import { InsertProductDTO } from "../../../shared/dtos/insert-product.dto";
import { PathEnum } from "../../../shared/enums/paths.enum";
import { useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../../../store/reducers/globalReducer/useGlobalReducer";


export const useInsertProduct = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [disabledButton, setDisabledButton] = useState<boolean>(true);
    const [product, setProduct] = useState<InsertProductDTO>({ name: '', price: 0, image: '', })
    const { setNotification } = useGlobalReducer();
    const navigate = useNavigate();

    useEffect(() => {
        if (product.name && product.categoryId && product.image && product.price > 0) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        }
    }, [product])

    const handleSave = async () => {
        setLoading(true)
        await connectionAPIPost(URL_PRODUCT, product)
            .then(() => {
                setNotification('Produto cadastrado.', 'success')
                navigate(PathEnum.PRODUCT)
            })
            .catch((error: Error) => { setNotification(error.message, 'error') });
        
            setLoading(false)
    }

    const handleCancel = () => {
        navigate(PathEnum.PRODUCT)
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
        product,
        loading,
        disabledButton,
        handleCancel,
        handleChangeSelect,
        onChangeInput,
        handleSave
    }

}
