import { Screen } from "../../../shared/components/screen/Screen"
import { PathEnum } from "../../../shared/enums/paths.enum"
import { ProductInsertContainer } from "../styles/productInsert.style"
import { Input } from "../../../shared/components/inputs/input/Input"
import { Button } from "../../../shared/components/buttons/button/Button"
import { CheckOutlined, CloseOutlined } from "@ant-design/icons"
import { Select } from "../../../shared/components/inputs/select/Select"
import { LimitedContainer } from "../../../shared/components/styles/limited.styled"
import { DisplayFlexJustifyRight } from "../../../shared/components/styles/display.styled"
import { InputMoney } from "../../../shared/components/inputs/inputMoney/InputMoney"
import { useInsertProduct } from "../hooks/useInsertProduct"
import { useCategory } from "../../category/hooks/useCategory"

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
    const {categories} = useCategory();
    const {handleCancel, handleSave, onChangeInput, handleChangeSelect, disabledButton, loading, product} = useInsertProduct();


    return (
        <Screen listBreadcrumb={listBreadcrumb}>
            <ProductInsertContainer>
                <LimitedContainer width={400}>

                    <Input onChange={(e) => onChangeInput(e, 'name')} value={product.name} title="Nome" />
                    <Input onChange={(e) => onChangeInput(e, 'image')} value={product.image} title="URL Imagem" />
                    <InputMoney onChange={(e) => onChangeInput(e, 'price', true)} value={product.price}  title="Preço"/>

                    <Select
                        title="Categorias"
                        onChange={handleChangeSelect}
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
                            <Button loading={loading} disabled={disabledButton} onClick={handleSave} margin="20px 0" type="primary" icon={<CheckOutlined />}>Salvar</Button>
                        </LimitedContainer>
                    </DisplayFlexJustifyRight>

                </LimitedContainer>
            </ProductInsertContainer>
        </Screen>
    )
}
