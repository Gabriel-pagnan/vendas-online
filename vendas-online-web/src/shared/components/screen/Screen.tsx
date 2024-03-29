import { Breadcrumb, IListBreadcrumb } from "../breadcrumb/Breadcrumb"
import { Header } from "../header/Header";
import { Menu } from "../menu/Menu";
import { ScreenContainer } from "./screen.style";
import { Divider } from "antd";

interface IScreenProps {
    children: React.ReactNode,
    listBreadcrumb?: IListBreadcrumb[],
}

export const Screen = ({ children, listBreadcrumb }: IScreenProps) => {
    return (
        <>
            <Header />
            <ScreenContainer>
                <Menu />
                {listBreadcrumb && (
                    <>
                        <Breadcrumb listBreadcrumb={listBreadcrumb} />
                        <Divider />
                    </>
                )}
                {children}
            </ScreenContainer>
        </>
    )
}
