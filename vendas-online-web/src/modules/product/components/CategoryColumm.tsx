import { Space, Tag } from "antd";
import { CategoryType } from "../../../shared/types/CategoryTypes"

interface ICategoryColummProps {
    category?: CategoryType
}

const colors: string[] = [
    'green',
    'red',
    '#d7a240',
    'orange',
    'blue',
    '#3fcece',
    'pink',
    '#2e91d7',
    '#35a2d5',
    ' purple',
    '#9add7e',
];

export const CategoryColumm = ({ category }: ICategoryColummProps) => {
    if (!category) return null;

    const currentColor = colors[category.id - 1] || colors[0];

    return (
        <Tag color={currentColor}>{category.name}</Tag>
    );
}
