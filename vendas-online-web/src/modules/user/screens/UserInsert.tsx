import { Screen } from "../../../shared/components/screen/Screen"
import { PathEnum } from "../../../shared/enums/paths.enum"

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
    return (
        <Screen listBreadcrumb={listBreadcrum}>

        </Screen>
    )
}
