import { useEffect, useState } from "react"
import { Screen } from "../../../shared/components/screen/Screen"
import { PathEnum } from "../../../shared/enums/paths.enum"
import { useDataContext } from "../../../shared/hooks/useDataContext"
import { useRequests } from "../../../shared/hooks/useRequests"
import { MethodsEnum } from "../../../shared/enums/methods.enum"
import { URL_CATEGORY, URL_PRODUCT } from "../../../shared/constants/urls"
import { LimitedContainer } from "../styles/productInsert.style"
import { Input } from "../../../shared/components/inputs/input/Input"
import { Button } from "../../../shared/components/buttons/button/Button"
import { CheckOutlined } from "@ant-design/icons"
import { Select } from "../../../shared/components/inputs/select/Select"
import { InsertProductDTO } from "../../../shared/dtos/insert-product.dto"
import { connectionAPIPost } from "../../../shared/functions/connection/connetionAPI"

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
    const [product, setProduct] = useState<InsertProductDTO>({name: '', price: 0, image: '', })
    const { categories, setCategories } = useDataContext();
    const { request } = useRequests();

    useEffect(() => {
        if (categories.length === 0) {
            request(URL_CATEGORY, MethodsEnum.GET, setCategories)
        }
    }, [])

    const handleSave = () => {
        connectionAPIPost(URL_PRODUCT, product)
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
        setProduct({...product, [nameObject]: e.target.value})
    }

    const handleChange = (value: string) => {
        setProduct({...product, categoryId: Number(value)})
    };
    const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({...product, price: Number(e.target.value)})
    };

    return (
        <Screen listBreadcrumb={listBreadcrumb}>
            <LimitedContainer>
                <Input onChange={(e) => onChange(e, 'name')} value={product.name} title="Nome" />
                <Input onChange={(e) => onChange(e, 'image')} value={product.image} title="URL Imagem" />
                <Input onChange={handleChangePrice} value={product.price} title="Preço" />

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
                <Button onClick={handleSave} margin="20px 0" color="green" type="primary" icon={<CheckOutlined />}>Salvar</Button>

            </LimitedContainer>
        </Screen>
    )
}
