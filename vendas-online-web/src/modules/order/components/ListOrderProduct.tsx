import { ColumnsType } from "antd/es/table";
import { OrderProductType } from "../../../shared/types/OrderProductType"
import { convertNumberToMoney } from "../../../shared/functions/money";
import Table from "../../../shared/components/tables/Table";

const columns: ColumnsType<OrderProductType> = [
    {
        title: 'Nome Produto',
        dataIndex: 'name',
        key: 'name',
        render: (_, target) => target.product?.name,
    },
    {
        title: 'Quantidade',
        dataIndex: 'amount',
        key: 'amount',
        render: (text) => text,
    },
    {
        title: 'Preço',
        dataIndex: 'price',
        key: 'price',
        sorter: (a, b) => a.price - b.price,
        render: (text) => convertNumberToMoney(text),
    },
    {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        render: (_, target) => convertNumberToMoney(target.price * target.amount),
    },
];

interface IListOrderProduct {
    ordersProduct?: OrderProductType[];
}

export const ListOrderProduct = ({ ordersProduct }: IListOrderProduct) => {
    if (!ordersProduct || ordersProduct.length <= 0) {
        return (
            <p>Não há produtos</p>
        )
    }

    return (
        <Table columns={columns} dataSource={ordersProduct} rowKey='id' />
    )
}
