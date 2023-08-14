import { CheckOutlined, CloseOutlined } from "@ant-design/icons"
import { Button } from "../../../shared/components/buttons/button/Button"
import { Input } from "../../../shared/components/inputs/input/Input"
import { Screen } from "../../../shared/components/screen/Screen"
import { DisplayFlexJustifyCenter, DisplayFlexJustifyRight } from "../../../shared/components/styles/display.styled"
import { LimitedContainer } from "../../../shared/components/styles/limited.styled"
import { PathEnum } from "../../../shared/enums/paths.enum"
import { useInsertUser } from "../hooks/useUserInsert"

const listBreadcrum = [
    {
        name: 'HOME',
    },
    {
        name: 'CLIENTES',
        navigateTo: PathEnum.USER
    },
    {
        name: 'NOVO CLIENTE'
    }
]

export const UserInsert = () => {
    const {handleCancel, handleSave, loading, onChangeInput, user, disabledButton} = useInsertUser();

    return (
        <Screen listBreadcrumb={listBreadcrum}>
            <DisplayFlexJustifyCenter>
                <LimitedContainer width={400}>
                    <Input value={user.name} onChange={(e) => onChangeInput(e, 'name')} title="Nome" />
                    <Input value={user.phone} onChange={(e) => onChangeInput(e, 'phone')} title="Telefone" />
                    <Input value={user.email} onChange={(e) => onChangeInput(e, 'email')} title="E-mail" />
                    <Input value={user.cpf} onChange={(e) => onChangeInput(e, 'cpf')} title="CPF" />
                    <Input value={user.password} onChange={(e) => onChangeInput(e, 'password')} title="Senha" />

                    <DisplayFlexJustifyRight>
                        <LimitedContainer width={120} margin="0 20px 20px">
                            <Button onClick={handleCancel} margin="20px 0" danger icon={<CloseOutlined />}>Cancelar</Button>
                        </LimitedContainer>

                        <LimitedContainer width={120}>
                            <Button onClick={handleSave} loading={loading} disabled={disabledButton} margin="20px 0" color="#24BA73" type="primary" icon={<CheckOutlined />}>Salvar</Button>
                        </LimitedContainer>
                    </DisplayFlexJustifyRight>
                </LimitedContainer>
            </DisplayFlexJustifyCenter>
        </Screen>
    )
}
