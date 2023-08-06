import { useNavigate } from "react-router-dom"
import { Breadcrumb as BreadcrumbAntd } from 'antd';

export interface IListBreadcrumb {
    name: string;
    navigateTo?: string;
}

interface IBreadcrumbProps {
    listBreadcrumb: IListBreadcrumb[];
}

export const Breadcrumb = ({ listBreadcrumb }: IBreadcrumbProps) => {
    const navigate = useNavigate();

    const handleNavigate = (navigateTo: string) => {
        navigate(navigateTo)
    }
    return (
        <BreadcrumbAntd style={{background: '#fff'}}>
            {listBreadcrumb.map((breadcrumb, index) => (
                <BreadcrumbAntd.Item key={index}>
                    {breadcrumb.navigateTo ? (
                        <a onClick={() => handleNavigate(breadcrumb.navigateTo || '')}>
                            {breadcrumb.name}
                        </a>
                    ) : breadcrumb.name}
                </BreadcrumbAntd.Item>
            ))}
        </BreadcrumbAntd>
    )
}
