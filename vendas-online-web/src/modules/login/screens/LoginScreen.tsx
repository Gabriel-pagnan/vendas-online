import { useState } from "react";
import { Button } from "../../../shared/components/buttons/button/Button";
import { Input } from "../../../shared/components/inputs/input/Input";
import { ContainerLoginScreen, LimitedContainer, ContainerLogin, TitleLogin } from "../styles/loginScreen.style";
import { useRequests } from "../../../shared/hooks/useRequests";
import { useNavigate } from "react-router-dom";

export const LoginScreen = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { loading, authRequest } = useRequests();
    const navigate = useNavigate();

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleLogin = () => {
        authRequest(navigate, { email, password });        
    }    

    return (
        <div>
            <ContainerLoginScreen>
                <ContainerLogin>

                    <LimitedContainer>
                        <TitleLogin level={2} type="secondary" style={{ color: '#764582' }}>LOGIN</TitleLogin>
                        <Input className="inputLogin" title="Usuário" onChange={handleEmail} value={email} />
                        <Input className="inputLogin" title="Senha" type="password" onChange={handlePassword} value={password} />
                        <Button loading={loading} type="primary" onClick={handleLogin} color="#764582" margin="50px" height="45px">ENTRAR</Button>
                    </LimitedContainer>

                </ContainerLogin>
            </ContainerLoginScreen>
        </div>
    );
}