import React, { FC, useEffect, useState } from 'react';
import { Table } from 'antd';
import Layout from 'presentation/component/layout/Main';
import generateData from 'presentation/component/page/home/generate/generateData';
import { Wrapper } from './styles';

const COLUMNS = [
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

const HomePage: FC = () => {
    const [data, setData] = useState<RowT[]>([]);

    useEffect(() => {
        generateData({
            classesAmount: 3,
            featureAmount: 3,
            maxPeriodAmount: 3,
        }).then(value => setData(value));
    }, []);

    return (
        <Layout>
            <Wrapper>
                <Table
                    dataSource={data}
                    columns={COLUMNS}
                    rowClassName={(row: RowT) => row.class % 2 === 0 ? 'even' : 'odd'}
                />;
            </Wrapper>
        </Layout>
    );
};


export default HomePage;
