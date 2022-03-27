import React, { FC, useEffect, useState } from 'react';
import { Button, Space, Table as AntdTable } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import exportFromJSON, { ExportType } from 'export-from-json';
import intervalToString from 'helper/interval/intervalToString';
import { HeaderWrapper } from 'presentation/component/page/modelKnowledgeBase/Table/styles';
import { recoveryDataKnowledgeBase } from './inductiveRecovery';

type PropsT = {
    values: ThirdValueT[];
};

const Table: FC<PropsT> = (props) => {
    const { values } = props;
    const [tableData, setTableData] = useState<ValueT[]>([]);

    const exportFile = async (type: ExportType) => {
        exportFromJSON({
            data: tableData.map(({ ...rest }) => ({ ...rest })),
            fileName: 'InductiveKnowledgeBase',
            exportType: type,
        });
    };

    useEffect(() => {
        const res = recoveryDataKnowledgeBase(values);

        setTableData(res);
    }, []);

    return (
        <AntdTable
            title={() => (
                <HeaderWrapper>
                    <Space>
                        <Button
                            icon={<DownloadOutlined />}
                            onClick={() => exportFile('json')}
                            type="primary"
                        >
                            Скачать JSON
                        </Button>
                    </Space>
                </HeaderWrapper>
            )}
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
