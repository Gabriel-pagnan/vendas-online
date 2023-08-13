import { ColumnsType } from "antd/es/table";
import { Screen } from "../../../shared/components/screen/Screen"
import Table from "../../../shared/components/tables/Table"
import { CategoryType } from "../../../shared/types/CategoryTypes";
import { useCategory } from "../hooks/useCategory";
import { Button } from "../../../shared/components/buttons/button/Button";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { PathEnum } from "../../../shared/enums/paths.enum";
import { LimitedContainer } from "../../../shared/components/styles/limited.styled";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { DisplayFlexJustifyBetween } from "../../../shared/components/styles/display.styled";

const { Search } = Input;
const columns: ColumnsType<CategoryType> = [
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
        render: (text) => text,
        sorter: (a, b) => a.name.localeCompare(b.name),

    },
    {
        title: 'Qnt Produtos',
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
        name: 'CATEGORIAS'
    }
]

export const Category = () => {
    const [filterCategory, setFilterCategory] = useState<CategoryType[]>([])
    const { categories } = useCategory();
    const navigate = useNavigate()

    const handleClickInsert = () => {
        navigate(PathEnum.CATEGORY_INSERT)
    }

    useEffect(() => {
        setFilterCategory([...categories])
    }, [categories]);
    
    const onSearch = (value: string) => {
        setFilterCategory([
            ...categories.filter((category) => category.name.toUpperCase().includes(value.toUpperCase()))
        ])
    }

    return (
        <Screen listBreadcrumb={listBreadcrum}>
            <DisplayFlexJustifyBetween margin="10px 16px">
                <LimitedContainer width={350}>
                    <Search placeholder="Buscar categoria" onSearch={onSearch} enterButton />
                </LimitedContainer>

                <LimitedContainer width={120}>
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleClickInsert}>INSERIR</Button>
                </LimitedContainer>
            </DisplayFlexJustifyBetween>
            <Table columns={columns} dataSource={filterCategory} />
        </Screen>
    )
}
