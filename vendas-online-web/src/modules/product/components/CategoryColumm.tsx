import { Space, Tag } from "antd";
import { CategoryType } from "../../../shared/types/CategoryTypes"

interface ICategoryColummProps {
    category?: CategoryType
}

const colors: string[] = [
    '#008000',
    '#FF0000',
    '#ffa500',
    '#FFD700',
    '#4E2728 ',
    '#00FFFF',
    '#FF00FF',
    '#108ee9',
    '#2db7f5',
    ' #800080',
    '#87d068',
];

export const CategoryColumm = ({ category }: ICategoryColummProps) => {
    if (!category) return null;

    const currentColor = colors[category.id - 1] || colors[0];

    return (
        <Space size={[0, 8]} wrap>
            <Tag color={currentColor}>{category.name}</Tag>
        </Space>
    );
}
