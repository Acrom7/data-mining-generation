import { FC, useMemo } from 'react';
import { Table as AntdTable, TableColumnProps } from 'antd';
import generateDataSampling from './generateDataSampling';

type PropsT = {
    amount: number;
    values: ValueT[];
};

const rowRender: TableColumnProps<any>['render'] = (value, row, index) => {
    const obj = {
        children: value,
        props: {} as { rowSpan: number | undefined },
    };

    if (row.moment === 1) {
        obj.props.rowSpan = row.observationMomentsAmount;
    } else if (index === 0 && row.moment !== 1) {
        obj.props.rowSpan = row.observationMomentsAmount - row.moment + 1;
    } else {
        obj.props.rowSpan = 0;
    }

    return obj;
};

const Table: FC<PropsT> = (props) => {
    const { amount, values } = props;
    const tableData = useMemo(() => generateDataSampling(amount, values), [amount, values]);

    return (
        <AntdTable
            dataSource={tableData}
            columns={[
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
                    title: 'ЧПД',
                    dataIndex: 'periodAmount',
                    render: rowRender,
                },
                {
                    title: '№ периода',
                    dataIndex: 'period',
                    render: rowRender,
                },
                {
                    title: 'Длительность периода',
                    dataIndex: 'periodDuration',
                    render: rowRender,
                },
                {
                    title: 'Число моментов наблюдения',
                    dataIndex: 'observationMomentsAmount',
                    render: rowRender,
                },
                {
                    title: 'Момент наблюдения',
                    dataIndex: 'moment',
                },
                {
                    title: 'Длительность момента',
                    dataIndex: 'momentDuration',
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
