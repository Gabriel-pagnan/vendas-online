import { BoxInput, TitleInput } from './input.styles'
import { Input as InputAntd, InputProps as InputPropsAntd } from 'antd';
import '../../../../App.css'

export interface InputProps extends InputPropsAntd {
    title?: string;
    margin?: string;
}

export const Input = ({ title, margin, ...props }: InputProps) => {
    return (
        <BoxInput style={{ margin }}>
            {title && <TitleInput>{title}</TitleInput>}
            <InputAntd className='input' {...props} />
        </BoxInput>
    )
}
