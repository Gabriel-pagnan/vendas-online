import { Tooltip } from '../../../shared/components/tooltip/Tooltip';
import { ProductType } from '../../../shared/types/ProductType';
import { ImageProduct } from '../styles/tooltipImage.style';

interface ITooltipImageProps {
    product: ProductType;
}

export const TooltipImage = ({ product }: ITooltipImageProps) => {
    return (
        <Tooltip tooltip={<ImageProduct src={product.image} /> } >
            <span>{product.name}</span>
        </Tooltip>
    );
};

