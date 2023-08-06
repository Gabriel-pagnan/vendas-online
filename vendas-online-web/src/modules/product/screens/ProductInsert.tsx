import { Screen } from "../../../shared/components/screen/Screen"
import { PathEnum } from "../../../shared/enums/paths.enum"

export const ProductInsert = () => {
    return (
        <Screen listBreadcrumb={[
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
        ]}>
            ProductInsert
        </Screen>
    )
}
