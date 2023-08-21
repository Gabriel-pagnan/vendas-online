import { useMemo } from "react";
import { ProductType } from "../../../shared/types/ProductType";
import type { ColumnsType } from 'antd/es/table';
import Table from "../../../shared/components/tables/Table";
import { CategoryColumm } from "../components/CategoryColumm";
import { TooltipImage } from "../components/TooltipImage";
import { convertNumberToMoney } from "../../../shared/functions/money";
import { Screen } from "../../../shared/components/screen/Screen";
import { Button } from "../../../shared/components/buttons/button/Button";
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Input, Modal } from "antd";
import { LimitedContainer } from "../../../shared/components/styles/limited.styled";
import { DisplayFlex, DisplayFlexJustifyBetween } from "../../../shared/components/styles/display.styled";
import { useProduct } from "../hooks/useProduct";

const { Search } = Input;

const listBreadcrum = [
    {
        name: 'HOME',
    },
    {
        name: 'PRODUTOS'
    }
]

export const Product = () => {
    const { handleClickInsert, onSearch, filterProduct, handleDelete, handleCloseModal, handleOpenModal, openModalDelete, handleEdit } = useProduct();

    const columns: ColumnsType<ProductType> = useMemo(() => (
        [
            {
                title: 'Id',
                dataIndex: 'id',
                key: 'id',
                render: (text) => text,
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                sorter: (a, b) => a.name.localeCompare(b.name),
                render: (_, product) => <a><TooltipImage product={product} /></a>,

            },
            {
                title: 'Categoria',
                dataIndex: 'category',
                key: 'category',
                render: (_, product) => <CategoryColumm category={product.category} />,
            },
            {
                title: 'Preço',
                dataIndex: 'price',
                key: 'price',
                sorter: (a, b) => a.price - b.price,
                render: (_, product) => convertNumberToMoney(product.price),
            },
            {
                title: 'Ações',
                dataIndex: '',
                key: 'id',
                width: 240,
                render: (_, product) => (
                    <LimitedContainer width={95}>
                        <DisplayFlex>
                            <Button type="primary" margin="0 10px"  onClick={() => handleEdit(product.id)} icon={<EditOutlined />}>
                                Editar
                            </Button>
                            <Button type="primary" danger style={{ marginLeft: '10px' }} onClick={() => handleOpenModal(product.id)} icon={<DeleteOutlined />}>
                                Excluir
                            </Button>
                        </DisplayFlex>
                    </LimitedContainer>
                )

            }
        ]
    ), []);

    return (
        <Screen listBreadcrumb={listBreadcrum}>
            <DisplayFlexJustifyBetween margin="10px 16px">
                <LimitedContainer width={350}>
                    <Search placeholder="Buscar produto" onSearch={onSearch} enterButton prefix={<SearchOutlined />} />
                </LimitedContainer>

                <LimitedContainer width={120}>
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleClickInsert}>INSERIR</Button>
                </LimitedContainer>
            </DisplayFlexJustifyBetween>
            <Table columns={columns} dataSource={filterProduct} rowKey='id' />

            <Modal
                title="Atenção"
                open={openModalDelete}
                onOk={handleDelete}
                onCancel={handleCloseModal}
                okText="Sim"
                okType="danger"
                cancelText="Cancelar">
                <p>Tem certeza que deseja excluir esse produto?</p>
            </Modal>
        </Screen>
    )
}