import { Screen } from "../../../shared/components/screen/Screen"
import { PathEnum } from "../../../shared/enums/paths.enum"

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
    return (
        <Screen listBreadcrumb={listBreadcrumb}>
            ProductInsert
        </Screen>
    )
}
