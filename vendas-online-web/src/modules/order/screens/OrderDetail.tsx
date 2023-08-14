import { Descriptions, Divider, Spin } from "antd"
import { Screen } from "../../../shared/components/screen/Screen"
import { PathEnum } from "../../../shared/enums/paths.enum"
import { useOrderDetail } from "../hooks/useOrderDatail";
import { useParams } from "react-router-dom";
import { DisplayFlexJustifyCenter } from "../../../shared/components/styles/display.styled";
import { convertNumberToMoney } from "../../../shared/functions/money";
import { ListOrderProduct } from "../components/ListOrderProduct";
import { insertMaskInCPF } from "../../../shared/functions/cpf";
import { insertMaskInPhone } from "../../../shared/functions/phone";
import { insertMaskInCEP } from "../../../shared/functions/address";

const listBreadcrum = [
    {
        name: 'HOME',
    },
    {
        name: 'PEDIDOS',
        navigateTo: PathEnum.ORDER
    },
    {
        name: 'DETALHE PEDIDO'
    }
];

export const OrderDetail = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const { order, loading } = useOrderDetail(orderId);

    return (
        <Screen listBreadcrumb={listBreadcrum}>
            {!order || loading ? (
                <DisplayFlexJustifyCenter>
                    <Spin size="large" />
                </DisplayFlexJustifyCenter>
            ) : (
                <>
                    <Descriptions title="Dados do usuário" bordered>
                        <Descriptions.Item label="Nome" labelStyle={{color: 'blue'}}>{order.user?.name}</Descriptions.Item>
                        <Descriptions.Item label="E-mail" span={2} labelStyle={{color: 'blue'}}>
                            {order.user?.email}
                        </Descriptions.Item>
                        <Descriptions.Item label="Telefone" labelStyle={{color: 'blue'}}>
                            {insertMaskInPhone(order.user?.phone)}
                        </Descriptions.Item>
                        <Descriptions.Item label="CPF" span={2} labelStyle={{color: 'blue'}}>
                            {insertMaskInCPF(order.user?.cpf)}
                        </Descriptions.Item>
                    </Descriptions>

                    <Divider />

                    <Descriptions title="Dados do pagamento" bordered>
                        <Descriptions.Item label="Preço" labelStyle={{color: 'blue'}}>
                            {convertNumberToMoney(order.payment?.price || 0)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Desconto" span={2} labelStyle={{color: 'blue'}}>
                            {convertNumberToMoney(order.payment?.discount || 0)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Preço Final" labelStyle={{color: 'blue'}}>
                            {convertNumberToMoney(order.payment?.finalPrice || 0)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Pagamento" span={2} labelStyle={{color: 'blue'}}>
                            {order.payment?.type}
                        </Descriptions.Item>
                        <Descriptions.Item label="Status" span={2} labelStyle={{color: 'blue'}}>
                            {order.payment?.paymentStatus?.name}
                        </Descriptions.Item>
                    </Descriptions>

                    <Divider />

                    <Descriptions title="Dados do endereço" bordered>
                        <Descriptions.Item label="Cidade" labelStyle={{color: 'blue'}}>{order.address?.city?.name}</Descriptions.Item>
                        <Descriptions.Item label="Estado" labelStyle={{color: 'blue'}}>{order.address?.city?.state?.name}</Descriptions.Item>
                        <Descriptions.Item label="Complemento" labelStyle={{color: 'blue'}}>{order.address?.complement}</Descriptions.Item>
                        <Descriptions.Item label="Número" labelStyle={{color: 'blue'}}>{order.address?.numberAddress}</Descriptions.Item>
                        <Descriptions.Item label="CEP" span={2} labelStyle={{color: 'blue'}}>
                            {insertMaskInCEP(order.address?.cep || '')}
                        </Descriptions.Item>
                    </Descriptions>

                    <Divider />

                    <Descriptions title="Produtos" bordered>
                        <Descriptions.Item>
                            <ListOrderProduct ordersProduct={order.ordersProduct} />
                        </Descriptions.Item>
                    </Descriptions>
                </>
            )}
        </Screen>
    )
}
