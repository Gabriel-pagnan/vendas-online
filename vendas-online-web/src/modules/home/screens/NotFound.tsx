import { Result } from "antd";
import { Button } from '../../../shared/components/buttons/button/Button'
import { useNavigate } from "react-router-dom";
import { PathEnum } from "../../../shared/enums/paths.enum";
import { ContainerNotFound } from "../styles/notFound.styles";

export const NotFound = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(PathEnum.LOGIN);
    };

    return (
        <ContainerNotFound>
            <Result
                status="404"
                title="404"
                subTitle="Não sei como chegou aqui mas, essa pagína não existe!"
                extra={
                    <Button type="primary" color="#764582" onClick={handleClick}>Voltar</Button>
                } />
        </ContainerNotFound>
    )
}
