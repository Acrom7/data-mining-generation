import React, { FC, useEffect, useState } from 'react';
import { Table } from 'antd';
import Layout from 'presentation/component/layout/Main';
import generateData, { RowT } from './generateData';

const COLUMNS = [
    {
        title: 'Class',
        dataIndex: 'class',
    },
    {
        title: 'Feature',
        dataIndex: 'feature',
    },
    {
        title: 'Period',
        dataIndex: 'period',
    },
];

const HomePage: FC = () => {
    const [data, setData] = useState<RowT[]>([]);

    useEffect(() => {
        generateData({
            classesAmount: 3,
            featureAmount: 3,
            periodAmount: 3,
            availableValues: {
                from: 1,
                to: 10,
            },
        }).then(value => {
            setData(value);
        });
    }, []);

    return (
        <Layout>
            <Table dataSource={data} columns={COLUMNS} />;
        </Layout>
    );
};


export default HomePage;
