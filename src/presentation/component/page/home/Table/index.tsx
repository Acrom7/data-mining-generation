import React, { FC } from 'react';
import { Table as AntdTable } from 'antd';
import { Wrapper } from './styles';

const COLUMNS: { title: string, dataIndex: keyof RowT }[] = [
    {
        title: 'Класс',
        dataIndex: 'class',
    },
    {
        title: 'Признак',
        dataIndex: 'feature',
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
    },
];

type PropsT = {
    data: RowT[]
}

const Table: FC<PropsT> = (props) => {
    const { data } = props;

    return (
        <Wrapper>
            <AntdTable
                dataSource={data}
                columns={COLUMNS}
                rowClassName={(row: RowT) => row.class % 2 === 0 ? 'even' : 'odd'}
            />;
        </Wrapper>
    );
};

export default Table;
