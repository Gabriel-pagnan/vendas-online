import { useEffect, useState } from "react"
import { Screen } from "../../../shared/components/screen/Screen"
import { PathEnum } from "../../../shared/enums/paths.enum"
import { useDataContext } from "../../../shared/hooks/useDataContext"
import { useRequests } from "../../../shared/hooks/useRequests"
import { MethodsEnum } from "../../../shared/enums/methods.enum"
import { URL_CATEGORY, URL_PRODUCT } from "../../../shared/constants/urls"
import { ProductInsertContainer } from "../styles/productInsert.style"
import { Input } from "../../../shared/components/inputs/input/Input"
import { Button } from "../../../shared/components/buttons/button/Button"
import { CheckOutlined, CloseOutlined } from "@ant-design/icons"
import { Select } from "../../../shared/components/inputs/select/Select"
import { InsertProductDTO } from "../../../shared/dtos/insert-product.dto"
import { connectionAPIPost } from "../../../shared/functions/connection/connetionAPI"
import { LimitedContainer } from "../../../shared/components/styles/limited.styled"
import { DisplayFlexJustifyRight } from "../../../shared/components/styles/display.styled"
import { useNavigate } from "react-router-dom"
import { useGlobalContext } from "../../../shared/hooks/useGlobalContext"
import { InputMoney } from "../../../shared/components/inputs/inputMoney/InputMoney"

const listBreadcrumb = [
    {
        name: 'HOME',
    },
    {
        name: 'PRODUTOS',
        navigateTo: PathEnum.PRODUCT
    },
    {
        name: 'INSERIR PRODUTO'
    }
]

export const ProductInsert = () => {
    const [product, setProduct] = useState<InsertProductDTO>({ name: '', price: 0, image: '', })
    const { categories, setCategories } = useDataContext();
    const { setNotification } = useGlobalContext();
    const navigate = useNavigate();
    const { request } = useRequests();

    useEffect(() => {
        if (categories.length === 0) {
            request(URL_CATEGORY, MethodsEnum.GET, setCategories)
        }
    }, [])

    const handleSave = async () => {
        await connectionAPIPost(URL_PRODUCT, product)
            .then(() => {
                setNotification('Produto cadastrado.', 'success')
                navigate(PathEnum.PRODUCT)
            })
            .catch((error: Error) => { setNotification(error.message, 'error') })
    }
    const handleCancel = () => {
        navigate(PathEnum.PRODUCT)
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, nameObject: string, isNumber?: boolean) => {
        setProduct({
            ...product,
            [nameObject]: isNumber ? Number(e.target.value) : e.target.value
        })
    }

    const handleChange = (value: string) => {
        setProduct({ ...product, categoryId: Number(value) })
    };

    return (
        <Screen listBreadcrumb={listBreadcrumb}>
            <ProductInsertContainer>
                <LimitedContainer width={400}>

                    <Input onChange={(e) => onChange(e, 'name')} value={product.name} title="Nome" />
                    <Input onChange={(e) => onChange(e, 'image')} value={product.image} title="URL Imagem" />
                    <InputMoney onChange={(e) => onChange(e, 'price', true)} value={product.price}  title="Preço"/>

                    <Select
                        title="Categorias"
                        onChange={handleChange}
                        options={
                            categories.map((category) => ({
                                value: `${category.id}`,
                                label: `${category.name}`
                            }))
                        }
                    />

                    <DisplayFlexJustifyRight>
                        <LimitedContainer width={120} margin="0 20px 20px">
                            <Button onClick={handleCancel} margin="20px 0" danger icon={<CloseOutlined />}>Cancelar</Button>
                        </LimitedContainer>

                        <LimitedContainer width={120}>
                            <Button onClick={handleSave} margin="20px 0" color="green" type="primary" icon={<CheckOutlined />}>Salvar</Button>
                        </LimitedContainer>
                    </DisplayFlexJustifyRight>

                </LimitedContainer>
            </ProductInsertContainer>
        </Screen>
    )
}
