import { useEffect, useState } from "react"
import { PathEnum } from "../../../shared/enums/paths.enum";
import { URL_CATEGORY } from "../../../shared/constants/urls";
import { useNavigate } from "react-router-dom";
import { useRequests } from "../../../shared/hooks/useRequests";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { useCategoryReducer } from "../../../store/reducers/categoryReducer/useCategoryReducer";
import { useGlobalReducer } from "../../../store/reducers/globalReducer/useGlobalReducer";

export const useInsertCategory = () => {
    const navigate = useNavigate();
    const {request} = useRequests();
    const {setCategories} = useCategoryReducer();
    const [name, setName] = useState<string>('');
    const { setNotification } = useGlobalReducer();
    const [loading, setLoading] = useState<boolean>(false);
    const [disabledButton, setDisabledButton] = useState<boolean>(true);

    useEffect(() => {
        if (name) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        }
    }, [name])

    const handleSave = async () => {
        setLoading(true)
        await request(URL_CATEGORY, MethodsEnum.POST, undefined, {name})
            .then(() => {
                setNotification('Categoria cadastrada.', 'success')
                navigate(PathEnum.CATEGORY)
            });

        await request(URL_CATEGORY, MethodsEnum.GET, setCategories)
        
        setLoading(false)
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
        disabledButton,
        onChangeName,
        handleSave,
        handleCancel
    }
}