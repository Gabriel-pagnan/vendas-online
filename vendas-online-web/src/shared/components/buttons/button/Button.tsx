import { ButtonProps } from 'antd';
import { BoxButton } from './button.style';

interface IButtonCurrentProps extends ButtonProps {
    margin?: string;
    color?: string
}

export const Button = ({ margin, color, ...props }: IButtonCurrentProps) => {
    return (
        <BoxButton {...props} style={{background: `${color}`, margin}}/>
    );
}