import { CheckOutlined, CloseOutlined } from "@ant-design/icons"
import { Button } from "../../../shared/components/buttons/button/Button"
import { Input } from "../../../shared/components/inputs/input/Input"
import { Screen } from "../../../shared/components/screen/Screen"
import { DisplayFlexJustifyCenter, DisplayFlexJustifyRight } from "../../../shared/components/styles/display.styled"
import { LimitedContainer } from "../../../shared/components/styles/limited.styled"
import { PathEnum } from "../../../shared/enums/paths.enum"
import { useInsertCategory } from "../hooks/useInsertCategory"

const listBreadcrum = [
    {
        name: 'HOME',
    },
    {
        name: 'CATEGORIAS',
        navigateTo: PathEnum.CATEGORY
    },
    {
        name: 'INSERIR CATEGORIA'
    }
]

export const CategoryInsert = () => {
    const {handleSave, loading, name, onChangeName, handleCancel, disabledButton} = useInsertCategory()

    return (
        <Screen listBreadcrumb={listBreadcrum}>
            <DisplayFlexJustifyCenter>
                <LimitedContainer width={400}>
                    <Input title="Nome" onChange={onChangeName} value={name} />

                    <DisplayFlexJustifyRight>
                        <LimitedContainer width={120} margin="0 20px 20px">
                            <Button margin="20px 0" onClick={handleCancel} danger icon={<CloseOutlined />}>Cancelar</Button>
                        </LimitedContainer>

                        <LimitedContainer width={120}>
                            <Button onClick={handleSave} disabled={disabledButton} loading={loading} margin="20px 0" type="primary" icon={<CheckOutlined />}>Salvar</Button>
                        </LimitedContainer>
                    </DisplayFlexJustifyRight>
                </LimitedContainer>
            </DisplayFlexJustifyCenter>
        </Screen>
    )
}
