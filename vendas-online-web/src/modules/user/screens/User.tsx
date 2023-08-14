import { ColumnsType } from "antd/es/table";
import { Screen } from "../../../shared/components/screen/Screen"
import { useUser } from "../hooks/useUser"
import { UserType } from "../../login/types/UserType";
import { insertMaskInPhone } from "../../../shared/functions/phone";
import { insertMaskInCPF } from "../../../shared/functions/cpf";
import Table from "../../../shared/components/tables/Table";
import { DisplayFlexJustifyBetween, DisplayFlexJustifyCenter } from "../../../shared/components/styles/display.styled";
import { LimitedContainer } from "../../../shared/components/styles/limited.styled";
import Search from "antd/es/input/Search";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "../../../shared/components/buttons/button/Button";
import { useEffect, useMemo, useState } from "react";
import Loading from "../../../shared/components/loading/Loading";
import { getUserInfo } from "../../../shared/functions/connection/auth";
import { UserTypeEnum } from "../../../shared/enums/user-type.enum";

const listBreadcrum = [
    {
        name: 'HOME',
    },
    {
        name: 'CLIENTES'
    }
]

const columns: ColumnsType<UserType> = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        // render: (_, product) => <TooltipImage product={product} />,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => text,
        sorter: (a, b) => a.name.localeCompare(b.name),

    },
    {
        title: 'E-mail',
        dataIndex: 'email',
        key: 'email',
        render: (text) => text,
        sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
        title: 'Tefone',
        dataIndex: 'phone',
        key: 'phone',
        render: (text) => insertMaskInPhone(text),
    },
    {
        title: 'CPF',
        dataIndex: 'cpf',
        key: 'cpf',
        render: (text) => insertMaskInCPF(text),
    }
];

export const User = () => {
    const { users, loading, handleClickInsert } = useUser();
    const [filterUser, setFilterUser] = useState<UserType[]>([])

    const userToken = useMemo(() =>  getUserInfo(), [])

    useEffect(() => {
        setFilterUser([...users])
    }, [users]);

    const onSearch = (value: string) => {
        setFilterUser([
            ...filterUser.filter((user) => user.name.toUpperCase().includes(value.toUpperCase()))
        ])
    }

    return (
        <Screen listBreadcrumb={listBreadcrum}>
            {loading ? (
                <DisplayFlexJustifyCenter>
                    <Loading size="large" />
                </DisplayFlexJustifyCenter>
            ) : (
                <>
                    <DisplayFlexJustifyBetween margin="10px 16px">
                        <LimitedContainer width={350}>
                            <Search placeholder="Buscar produto" onSearch={onSearch} enterButton />
                        </LimitedContainer>

                        <LimitedContainer width={200}>
                            {userToken?.typeUser === UserTypeEnum.Root && (
                                <Button type="primary" color="#764582" icon={<PlusOutlined />} onClick={handleClickInsert}>NOVO ADMIN</Button>
                            )}
                        </LimitedContainer>
                    </DisplayFlexJustifyBetween>

                    <Table columns={columns} dataSource={filterUser} rowKey='id' />
                </>
            )}
        </Screen>
    )
}
