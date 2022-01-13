import { FC, useEffect, useState } from 'react';
import { Table as AntdTable, TableColumnProps } from 'antd';

type PropsT = {
    amount: number;
    values: ValueT[];
};

const rowRender: TableColumnProps<any>['render'] = (value, row: DataSamplingTableRowT, index) => {
    const obj = {
        children: value,
        props: {} as { rowSpan: number | undefined },
    };

    if (row.momentNumber === 0) {
        obj.props.rowSpan = row.observationMomentsAmount;
    } else if (index === 0 && row.momentNumber !== 0) {
        obj.props.rowSpan = row.observationMomentsAmount - row.momentNumber;
    } else {
        obj.props.rowSpan = 0;
    }

    return obj;
};

const Table: FC<PropsT> = (props) => {
    const { amount, values } = props;
    const [tableData, setTableData] = useState<any[]>([]);
    const [isGenerating, setIsGenerating] = useState(true);

    useEffect(() => {
        const worker = new Worker(new URL('./worker.ts', import.meta.url));
        worker.postMessage({
            amount,
            values,
        });
        worker.onmessage = ({ data: { result } }) => {
            setTableData((prevState) => [...prevState, ...result]);
            setIsGenerating(false);
        };
    }, []);

    console.log(tableData);

    return (
        <AntdTable
            loading={isGenerating}
            dataSource={tableData}
            columns={[
                {
                    title: 'Номер истории болезни',
                    dataIndex: 'medicalHistoryNumber',
                    render: (value, row, index) => rowRender(`${value}`, row, index),
                },
                {
                    title: 'Класс',
                    dataIndex: 'class',
                    render: (value, row, index) => rowRender(`Заболевание${value}`, row, index),
                },
                {
                    title: 'Признак',
                    dataIndex: 'feature',
                    render: (value, row, index) => rowRender(`Признак${value}`, row, index),
                },
                {
                    title: 'Момент наблюдения',
                    dataIndex: 'moment',
                },
                {
                    title: 'Значение признака',
                    dataIndex: 'value',
                    render: (value) => value,
                },
            ]}
        />
    );
};

export default Table;
