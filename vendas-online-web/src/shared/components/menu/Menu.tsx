import { useState } from 'react';
import type { MenuProps } from 'antd';
import { Image, Menu as MenuAntd, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { BiSolidCategory } from 'react-icons/bi';
import { CgLogOff } from 'react-icons/cg';
import { FaUserTie, FaHome, FaBoxOpen, FaShoppingCart } from 'react-icons/fa';

import { PathEnum } from '../../enums/paths.enum';
import { logout } from '../../functions/connection/auth';
import { ContainerLogoName, ContainerMenu, NameCompany } from './menu.style';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';

type MenuItem = Required<MenuProps>['items'][number];

export const Menu = () => {
    const navigate = useNavigate();
    const {user} = useGlobalReducer();
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState('1');

    const items: MenuItem[] = [
        {
            key: 'home',
            label: 'Principal',
            icon: <FaHome />,
        },
        {
            key: 'products',
            label: 'Produtos',
            icon: <FaBoxOpen />,
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
            icon: <BiSolidCategory />,
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
            icon: <FaShoppingCart />,
            onClick: () => navigate(PathEnum.ORDER),
        },
        {
            key: 'user',
            label: 'Clientes',
            icon: <FaUserTie />,
            children: [
                {
                    key: 'user_view',
                    label: 'Visualizar',
                    onClick: () => navigate(PathEnum.USER),
                },
                {
                    key: 'user_insert',
                    label: 'Inserir',
                    onClick: () => navigate(PathEnum.USER_INSERT),
                },
            ],
        },
        {
            key: 'logout',
            label: 'Sair',
            icon: <CgLogOff size={20} />,
            style: { background: '#764582', position: 'absolute', bottom: 0, marginBottom: '15px' },
            onClick: () => showModal(),
        },
    ];

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };
    console.log(user);
    

    return (
        <ContainerMenu>
            <ContainerLogoName>
                <Image width={50} src='public/iconMenu.png' />
                <NameCompany>Olá {user?.name}</NameCompany>
            </ContainerLogoName>
            <MenuAntd 
                theme="dark"
                onClick={onClick}
                style={{ width: 240, background: '#313333', color: 'white' }}
                defaultOpenKeys={['sub1']}
                selectedKeys={[current]}
                mode="inline" 
                items={items}
            />
            <Modal
                title="Atenção"
                open={open}
                onOk={() => logout(navigate)}
                onCancel={hideModal}
                okText="Sim"
                cancelText="Cancelar">
                <p>Tem certeza que deseja sair?</p>
            </Modal>
        </ContainerMenu>
    );
};