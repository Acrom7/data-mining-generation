import React, { FC, useEffect, useState } from 'react';
import { Table as AntdTable } from 'antd';
import { recoveryOnePeriod } from './inductiveRecovery';
import intervalToString from 'helper/interval/intervalToString';

type PropsT = {
    values: ThirdValueT[];
};


const Table: FC<PropsT> = (props) => {
    const { values } = props;
    console.log({ values });
    const [tableData, setTableData] = useState<ValueT[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        const res = recoveryOnePeriod(values)

        console.log({ res });

        setTableData(res)
    }, []);

    return (
        <AntdTable
            loading={isGenerating}
            dataSource={tableData}
            columns={[
                {
                    title: 'Класс',
                    dataIndex: 'class',
                    render: (value) => `Заболевание${value}`,
                },
                {
                    title: 'Признак',
                    dataIndex: 'feature',
                    render: (value) => `Признак${value}`,
                },
                {
                    title: 'Число периодов динамики',
                    dataIndex: 'periodAmount',
                },
                {
                    title: '№ периода',
                    dataIndex: 'period',
                },
                {
                    title: 'ЗДП',
                    dataIndex: 'value',
                    render: (value) => intervalToString(value),
                },
                {
                    title: 'НГ',
                    dataIndex: 'bottomBorder',
                },
                {
                    title: 'ВГ',
                    dataIndex: 'topBorder',
                },
            ]}
        />
    );
};

export default Table;
