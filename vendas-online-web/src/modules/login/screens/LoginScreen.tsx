import { Button } from "../../../shared/components/buttons/button/Button";
import { Input } from "../../../shared/components/inputs/input/Input";
import { ContainerLoginScreen, LimitedContainer, ContainerLogin, TitleLogin } from "../styles/loginScreen.style";

export const LoginScreen = () => {
    return (
        <div>
            <ContainerLoginScreen>
                <ContainerLogin>

                    <LimitedContainer>
                        
                        <TitleLogin level={2} type="secondary" style={{color: '#764582'}}>LOGIN</TitleLogin>
                        <Input title="Usuário"/>
                        <Input title="Senha"/>
                        <Button type="primary" color="#764582" margin="50px">ENTRAR</Button>
                    </LimitedContainer>

                </ContainerLogin>
            </ContainerLoginScreen>
        </div>
    );
}