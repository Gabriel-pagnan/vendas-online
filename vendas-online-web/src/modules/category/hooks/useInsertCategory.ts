import { useEffect, useState } from "react"
import { PathEnum } from "../../../shared/enums/paths.enum";
import { URL_CATEGORY, URL_CATEGORY_ID } from "../../../shared/constants/urls";
import { useNavigate, useParams } from "react-router-dom";
import { useRequests } from "../../../shared/hooks/useRequests";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { useCategoryReducer } from "../../../store/reducers/categoryReducer/useCategoryReducer";
import { useGlobalReducer } from "../../../store/reducers/globalReducer/useGlobalReducer";

export const useInsertCategory = () => {
    const navigate = useNavigate();
    const {request, loading} = useRequests();
    const {setCategories, setCategory, category} = useCategoryReducer();
    const [name, setName] = useState<string>('');
    const { setNotification } = useGlobalReducer();
    const [disabledButton, setDisabledButton] = useState<boolean>(true);
    const { categoryId } = useParams<{ categoryId: string }>();

    useEffect(() => {
        if(category) {
            setName(category.name)
        }
    }, [category])

    useEffect(() => {
        if (name) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        }
    }, [name]);

    useEffect(() => {
        if(categoryId) {
            request(URL_CATEGORY_ID.replace('{categoryId}', categoryId), MethodsEnum.GET, setCategory)
        } else {
            setName('')
        }
    }, [categoryId])

    const handleSave = async () => {
        if(categoryId) {
            await request(URL_CATEGORY_ID.replace('{categoryId}', categoryId), MethodsEnum.PUT, undefined, {name})
            .then(() => {
                setNotification('Categoria salva.', 'success')
                navigate(PathEnum.CATEGORY)
            });
        } else {
            await request(URL_CATEGORY, MethodsEnum.POST, undefined, {name})
            .then(() => {
                setNotification('Categoria cadastrada.', 'success')
                navigate(PathEnum.CATEGORY)
            });
        }
        await request(URL_CATEGORY, MethodsEnum.GET, setCategories)
    }

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleCancel = () => {
        navigate(PathEnum.CATEGORY)
    }

    return {
        name,
        loading,
        categoryId,
        handleSave,
        handleCancel,
        onChangeName,
        disabledButton,
    }
}