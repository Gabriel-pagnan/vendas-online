import { BoxSelect, TitleSelect } from "./select.style"
import { Select as SelectAntd, SelectProps as SelectPropsAntd } from 'antd';

interface ISelectProps extends SelectPropsAntd {
    title?: string;
    margin?: string;
}

export const Select = ({ title, margin, ...props }: ISelectProps) => {
    return (
        <BoxSelect>
            
            {title && <TitleSelect>{title}</TitleSelect>}
            <SelectAntd style={{width: '100%'}} {...props} />

        </BoxSelect>
    )
}
