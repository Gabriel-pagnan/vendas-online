import { Space, Tag } from "antd";
import { CategoryType } from "../../../shared/types/CategoryTypes"

interface ICategoryColummProps {
    category?: CategoryType
}

const colors: string[] = [
    '#3b953b',
    '#d33131',
    '#d7a240',
    '#FFD700',
    '#8f4c4d ',
    '#3fcece',
    '#d439d4',
    '#2e91d7',
    '#35a2d5',
    ' #992799',
    '#9add7e',
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
