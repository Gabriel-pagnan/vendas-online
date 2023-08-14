import { useMemo } from "react";
import { ProductType } from "../../../shared/types/ProductType";
import type { ColumnsType } from 'antd/es/table';
import Table from "../../../shared/components/tables/Table";
import { CategoryColumm } from "../components/CategoryColumm";
import { TooltipImage } from "../components/TooltipImage";
import { convertNumberToMoney } from "../../../shared/functions/money";
import { Screen } from "../../../shared/components/screen/Screen";
import { Button } from "../../../shared/components/buttons/button/Button";
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Input } from "antd";
import { LimitedContainer } from "../../../shared/components/styles/limited.styled";
import { DisplayFlexJustifyBetween } from "../../../shared/components/styles/display.styled";
import { useProduct } from "../hooks/useProduct";
import { MdDelete } from "react-icons/md";

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
    const { handleClickInsert, onSearch, filterProduct, handleDelete } = useProduct();

    const columns: ColumnsType<ProductType> = useMemo(() => (
        [
            {
                title: 'Id',
                dataIndex: 'id',
                key: 'id',
                render: (_, product) => <TooltipImage product={product} />,
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: (text) => text,
                sorter: (a, b) => a.name.localeCompare(b.name),

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
                render: (_, product) => 
                <a onClick={() => handleDelete(product.id)}>
                    <MdDelete size={24} color='#d33131'/>
                </a>,
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
        </Screen>
    )
}