import { ColumnsType } from "antd/es/table";
import { Screen } from "../../../shared/components/screen/Screen"
import Table from "../../../shared/components/tables/Table"
import { CategoryType } from "../../../shared/types/CategoryTypes";
import { useCategory } from "../hooks/useCategory";
import { Button } from "../../../shared/components/buttons/button/Button";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { LimitedContainer } from "../../../shared/components/styles/limited.styled";
import { Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { DisplayFlex, DisplayFlexJustifyBetween } from "../../../shared/components/styles/display.styled";

const { Search } = Input;

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
    const { categories, handleClickInsert, handleCloseModal, handleOpenModal, confirmDelete, openModal } = useCategory();


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
            sorter: (a, b) => a.amountProducts - b.amountProducts,
        },
        {
            title: 'Ações',
            dataIndex: '',
            key: 'id',
            width: 240,
            render: (_, category) => (
                <LimitedContainer width={95}>
                    <DisplayFlex>
                        <Button type="primary" margin="0 10px" onClick={() => { }} icon={<EditOutlined />}>
                            Editar
                        </Button>
                        {category.amountProducts <= 0 && (
                            <Button type="primary" danger style={{ marginLeft: '10px' }} onClick={() => handleOpenModal(category.id)} icon={<DeleteOutlined />}>
                                Excluir
                            </Button>
                        )}
                    </DisplayFlex>
                </LimitedContainer>
            )

        }
    ];

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
            <Table columns={columns} dataSource={filterCategory} rowKey='id' />

            <Modal
                title="Atenção"
                open={openModal}
                onOk={confirmDelete}
                onCancel={handleCloseModal}
                okText="Sim"
                okType="danger"
                cancelText="Cancelar">
                <p>Tem certeza que deseja excluir essa categoria?</p>
            </Modal>
        </Screen>
    )
}
