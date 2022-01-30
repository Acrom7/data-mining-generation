import React, { FC, useEffect, useState } from 'react';
import { Button, Popover, Space, Table as AntdTable, TableColumnProps } from 'antd';
import { ExportButton, HeaderWrapper } from 'presentation/component/page/modelKnowledgeBase/Table/styles';
import { DownloadOutlined } from '@ant-design/icons';
import exportFromJSON, { ExportType } from 'export-from-json';
import { getData } from 'presentation/component/page/modelKnowledgeBase/Table/mapTableVariantToData';

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
    const [tableData, setTableData] = useState<DataSamplingTableRowT[]>([]);
    const [isGenerating, setIsGenerating] = useState(true);

    const exportFile = async (type: ExportType) => {
        exportFromJSON({
            data: tableData.map(({momentNumber, observationMomentsAmount, ...rest}) => ({...rest})),
            fileName: 'ModelDataSampling',
            exportType: type,
        });
    };

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
