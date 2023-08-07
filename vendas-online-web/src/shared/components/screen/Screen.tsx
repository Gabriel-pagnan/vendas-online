import { Breadcrumb, IListBreadcrumb } from "../breadcrumb/Breadcrumb"
import { ScreenContainer } from "./screen.style";
import { Divider } from "antd";

interface IScreenProps {
    children: React.ReactNode,
    listBreadcrumb?: IListBreadcrumb[],
}

export const Screen = ({ children, listBreadcrumb }: IScreenProps) => {
    return (
        <ScreenContainer>
            {listBreadcrumb && (
                <>
                    <Breadcrumb listBreadcrumb={listBreadcrumb}/>
                    <Divider />
                </>
            )}
            {children}
        </ScreenContainer>
    )
}
