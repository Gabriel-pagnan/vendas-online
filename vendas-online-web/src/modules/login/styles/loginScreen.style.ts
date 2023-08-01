import { Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

export const ContainerLoginScreen = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  background-image: url('/background2.svg');
  background-position: left;
  background-repeat: no-repeat;
`;

export const Background = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  object-fit: fill;
  z-index: -1;
`;

export const TitleLogin = styled(Title)`
  color: #764582;
`;

export const ContainerLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fbfbfa;
  padding: 25px;
  width: 100%;
  height: 100vh;
  max-width: 550px;
  box-shadow: -12px 9px 25px -9px rgba(0,0,0,0.1);
`;

export const LimitedContainer = styled.div`
  width: 100%;
  max-width: 498px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;