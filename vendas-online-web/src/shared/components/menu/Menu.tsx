import {
    HomeOutlined,
    LaptopOutlined,
    ProfileOutlined,
    SafetyCertificateOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu as MenuAntd } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { ContainerLogoName, ContainerMenu, NameCompany } from './menu.style';
import { PathEnum } from '../../enums/paths.enum';

type MenuItem = Required<MenuProps>['items'][number];

export const Menu = () => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState('1');

    const items: MenuItem[] = [
        {
            key: 'home',
            label: 'Principal',
            icon: <HomeOutlined />,
        },
        {
            key: 'products',
            label: 'Produtos',
            icon: <LaptopOutlined />,
            children: [
                {
                    key: 'products_view',
                    label: 'Visualizar',
                    onClick: () => navigate(PathEnum.PRODUCT),
                },
                {
                    key: 'products_insert',
                    label: 'Inserir',
                    onClick: () => navigate(PathEnum.PRODUCT_INSERT),
                },
            ],
        },
        {
            key: 'category',
            label: 'Categorias',
            icon: <ProfileOutlined />,
            children: [
                {
                    key: 'category_view',
                    label: 'Visualizar',
                    onClick: () => navigate(PathEnum.CATEGORY),
                },
                {
                    key: 'category_insert',
                    label: 'Inserir',
                    onClick: () => navigate(PathEnum.CATEGORY_INSERT),
                },
            ],
        },
        {
            key: 'order',
            label: 'Pedidos',
            icon: <SafetyCertificateOutlined />,
            onClick: () => navigate(PathEnum.ORDER),
        },
        {
            key: 'user',
            label: 'Clientes',
            icon: <UserOutlined />,
            onClick: () => navigate(PathEnum.USER),
        },
    ];

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    return (
        <ContainerMenu>
            <ContainerLogoName>
                {/* <LogoMenu /> */}
                <NameCompany>Vendas Online</NameCompany>
            </ContainerLogoName>
            <MenuAntd
                theme="dark"
                onClick={onClick}
                style={{ width: 240 }}
                defaultOpenKeys={['sub1']}
                selectedKeys={[current]}
                mode="inline"
                items={items}
            />
        </ContainerMenu>
    );
};