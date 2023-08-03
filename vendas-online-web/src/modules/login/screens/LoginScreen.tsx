import { useState } from "react";
import { Button } from "../../../shared/components/buttons/button/Button";
import { Input } from "../../../shared/components/inputs/input/Input";
import { ContainerLoginScreen, LimitedContainer, ContainerLogin, TitleLogin } from "../styles/loginScreen.style";
import { useRequests } from "../../../shared/hooks/useRequests";

export const LoginScreen = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {loading, postRequest} = useRequests();

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleLogin = async () => {
        postRequest('http://localhost:3001/auth', email, password)
    }

    return (
        <div>
            <ContainerLoginScreen>
                <ContainerLogin>

                    <LimitedContainer>
                        <TitleLogin level={2} type="secondary" style={{color: '#764582'}}>LOGIN</TitleLogin>
                        <Input title="Usuário" onChange={handleEmail} value={email}/>
                        <Input title="Senha" type="password" onChange={handlePassword} value={password}/>
                        <Button loading={loading} type="primary" onClick={handleLogin} color="#764582" margin="50px">ENTRAR</Button>
                    </LimitedContainer>

                </ContainerLogin>
            </ContainerLoginScreen>
        </div>
    );
}