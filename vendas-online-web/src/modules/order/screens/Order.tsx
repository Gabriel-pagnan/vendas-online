import { ColumnsType } from "antd/es/table";
import { Screen } from "../../../shared/components/screen/Screen"
import { useOrder } from "../hooks/useOrder"
import { OrderType } from "../../../shared/types/OrderType";
import Table from "../../../shared/components/tables/Table";
import { useNavigate } from "react-router-dom";
import { PathEnum } from "../../../shared/enums/paths.enum";

const columns: ColumnsType<OrderType> = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        render: (text) => text,
    },
    {
        title: 'Data',
        dataIndex: 'date',
        key: 'date',
        render: (text) => <a>{text}</a>,
        // sorter: (a, b) => a.date - b.date,
    },
    {
        title: 'Usuário',
        dataIndex: 'user',
        key: 'user',
        render: (_, target) => <a>{target.user?.name}</a>,
        sorter: (a, b) => a.user?.name.localeCompare(b.user?.name),

    },
    {
        title: 'Produtos',
        dataIndex: 'amountProducts',
        key: 'amountProducts',
        render: (text) => text,
    }
];

const listBreadcrum = [
    {
        name: 'HOME',
    },
    {
        name: 'PEDIDOS'
    }
]

export const Order = () => {
    const { orders } = useOrder();
    const navigate = useNavigate()

    return (
        <Screen listBreadcrumb={listBreadcrum}>
            <Table
                onRow={(record) => ({
                    onClick: () => navigate(`${PathEnum.ORDER}/${record.id}`),
                })}
                columns={columns}
                dataSource={orders} />
        </Screen>
    )
}
