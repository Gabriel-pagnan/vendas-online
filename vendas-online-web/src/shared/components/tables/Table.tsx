import { Table as TableAntD, TableProps } from 'antd';

export default function Table<RecordType extends object = any>(props: TableProps<RecordType>) {
    return <TableAntD {...props} />;
}
