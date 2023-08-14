import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { PathEnum } from "../../../shared/enums/paths.enum";
import { InsertUserDTO } from "../../../shared/dtos/insert-user.dto";
import { URL_USER } from "../../../shared/constants/urls";
import { connectionAPIPost } from "../../../shared/functions/connection/connetionAPI";
import { useGlobalReducer } from "../../../store/reducers/globalReducer/useGlobalReducer";

export const useInsertUser =() => {
    const navigate = useNavigate();
    const { setNotification } = useGlobalReducer();
    const [loading, setLoading] = useState<boolean>(false);
    const [disabledButton, setDisabledButton] = useState<boolean>(true);
    const [user, setUser] = useState<InsertUserDTO>({
        name: '',
        cpf: '',
        email: '',
        password: '',
        phone: ''
    })

    useEffect(() => {
        if (user.name && user.cpf && user.email && user.phone && user.password) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        }
    }, [user])

    const handleCancel = () => {
        navigate(PathEnum.USER)
    }
    
    const handleSave = async () => {
        setLoading(true)

        await connectionAPIPost(URL_USER, user)
            .then(() => {
                setNotification('Usuário cadastrado.', 'success')
                navigate(PathEnum.USER)
            })
            .catch((error: Error) => { setNotification(error.message, 'error') });
        setLoading(false)
    }

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setUser((currentUser) => ({
            ...currentUser,
            [name]: e.target.value
        }))
    }

    return {
        disabledButton,
        onChangeInput,
        handleCancel,
        handleSave,
        loading,
        user
    }
}