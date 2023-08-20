import { Typography } from 'antd';
import styled from 'styled-components';

const { Text } = Typography;

export const ContainerMenu = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: #313333;
  width: 240px;

  -webkit-box-shadow: 1px 0px 8px 0px rgba(0, 0, 0, 0.71);
  -moz-box-shadow: 1px 0px 8px 0px rgba(0, 0, 0, 0.71);
  box-shadow: 1px 0px 8px 0px rgba(0, 0, 0, 0.71);
`;

export const ContainerLogoName = styled.div`
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin: 0 0 30px 0;
`;

export const NameCompany = styled(Text)`
  font-size: 16px;
  color: white;
`;