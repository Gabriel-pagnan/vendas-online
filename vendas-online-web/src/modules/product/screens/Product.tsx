import { useEffect, useState } from "react";
import { useDataContext } from "../../../shared/hooks/useDataContext";
import { useRequests } from "../../../shared/hooks/useRequests";
import { URL_PRODUCT } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { ProductType } from "../../../shared/types/ProductType";

import type { ColumnsType } from 'antd/es/table';
import Table from "../../../shared/components/tables/Table";
import { CategoryColumm } from "../components/CategoryColumm";
import { TooltipImage } from "../components/TooltipImage";
import { convertNumberToMoney } from "../../../shared/functions/money";
import { Screen } from "../../../shared/components/screen/Screen";
import { Button } from "../../../shared/components/buttons/button/Button";
import { useNavigate } from "react-router-dom";
import { PathEnum } from "../../../shared/enums/paths.enum";
import { BoxButtons, LimiteSizeButton, LimiteSizeInput } from "../styles/product.style";
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Input } from "antd";

const { Search } = Input;

const columns: ColumnsType<ProductType> = [
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
    }
];

const listBreadcrum = [
    {
        name: 'HOME',
    },
    {
        name: 'PRODUTOS'
    }
]

export const Product = () => {
    const { products, setProducts } = useDataContext();
    const [filterProduct, setFilterProduct] = useState<ProductType[]>([])
    const { request } = useRequests();
    const navigate = useNavigate()

    useEffect(() => {
        setFilterProduct([...products])
    }, [products])

    useEffect(() => {
        request<ProductType[]>(URL_PRODUCT, MethodsEnum.GET, setProducts)
    }, [])

    const handleClickInsert = () => {
        navigate(PathEnum.PRODUCT_INSERT)
    }

    const onSearch = (value: string) => {
        if(!value) {
            setFilterProduct([...products])
        }else{
            setFilterProduct([
                ...filterProduct.filter((product) => product.name.includes(value))
            ])
        }
    }

    return (
        <Screen listBreadcrumb={listBreadcrum}>
            <BoxButtons>
                <LimiteSizeInput>
                    <Search placeholder="Buscar produto" onSearch={onSearch} enterButton prefix={<SearchOutlined />}/>
                </LimiteSizeInput>

                <LimiteSizeButton>
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleClickInsert}>INSERIR</Button>
                </LimiteSizeButton>
            </BoxButtons>
            <Table columns={columns} dataSource={filterProduct} />
        </Screen>
    )
}