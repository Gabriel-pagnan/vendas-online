import { useEffect } from "react";
import { useDataContext } from "../../../shared/hooks/useDataContext";
import { useRequests } from "../../../shared/hooks/useRequests";
import { URL_PRODUCT } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { ProductType } from "../../../shared/types/ProductType";

import type { ColumnsType } from 'antd/es/table';
import Table from "../../../shared/components/tables/Table";
import { CategoryColumm } from "../components/CategoryColumm";
import { TooltipImage } from "../components/TooltipImage";


const columns: ColumnsType<ProductType> = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        render: (_, product) => <TooltipImage product={product}/>,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Categoria',
        dataIndex: 'category',
        key: 'category',
        render: (_, product) => <CategoryColumm category={product.category}/>,
    },
    {
        title: 'Preço',
        dataIndex: 'price',
        key: 'price',
        render: (text) => <a>{text}</a>,
    }
];

export const Product = () => {
    const { products, setProducts } = useDataContext();
    const { request } = useRequests();

    useEffect(() => {
        request<ProductType[]>(URL_PRODUCT, MethodsEnum.GET, setProducts)       
    }, [])

    return (
        <div>
            <Table columns={columns} dataSource={products}/>
        </div>
    )
}