import { useEffect, useState } from "react";
import { useRequests } from "../../../shared/hooks/useRequests";
import { URL_CATEGORY, URL_CATEGORY_ID } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { useCategoryReducer } from "../../../store/reducers/categoryReducer/useCategoryReducer";
import { PathEnum } from "../../../shared/enums/paths.enum";
import { useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../../../store/reducers/globalReducer/useGlobalReducer";

export const useCategory = () => {
    const navigate = useNavigate();
    const { request } = useRequests();
    const { setNotification } = useGlobalReducer();
    const { categories, setCategories } = useCategoryReducer();
    const [categoryDelete, setCategoryDelete] = useState<number | undefined>()


    const handleClickInsert = () => {
        navigate(PathEnum.CATEGORY_INSERT)
    }

    useEffect(() => {
        if (!categories || categories.length === 0) {
            request(URL_CATEGORY, MethodsEnum.GET, setCategories)
        }
    }, []);

    const handleOpenModal = (categoryId: number) => {
        setCategoryDelete(categoryId)
    }

    const handleCloseModal = () => {
        setCategoryDelete(undefined)
    }

    const confirmDelete = async () => {
        await request(URL_CATEGORY_ID.replace('{categoryId}', `${categoryDelete}`), MethodsEnum.DELETE, undefined, undefined)
            .then(() => {
                setNotification('Categoria deletada.', 'warning')
            })
            .catch((error: Error) => { setNotification(error.message, 'error') });

        await request(URL_CATEGORY, MethodsEnum.GET, setCategories)
        setCategoryDelete(undefined)
    }

    return {
        categories,
        confirmDelete,
        handleOpenModal,
        handleCloseModal,
        handleClickInsert,
        openModal: !!categoryDelete,
    }
}