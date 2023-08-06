import { ContainerExternal, ContainerTooltip } from "./tooltip.style"
import { Tooltip as TooltipAntd } from "antd";

interface ITooltipProps {
    children: React.ReactNode,
    tooltip?: React.ReactNode,
    title?: string
}

export const Tooltip = ({children, tooltip, title}: ITooltipProps) => {
    if(title) {
        <TooltipAntd title={title}>{children}</TooltipAntd>
    }

    return (
        <ContainerTooltip>
            <ContainerExternal>{tooltip}</ContainerExternal>
            {children}
        </ContainerTooltip>
    )
}
