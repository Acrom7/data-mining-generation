import React, { FC, useState } from 'react';
import exportFromJSON, { ExportType } from 'export-from-json';
import { Table as AntdTable, Button, Space, Popover } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { getColumns, getData, TableVariantT } from './mapTableVariantToData';
import { HeaderWrapper, Wrapper } from './styles';

type PropsT = {
    data: GenerateReturnT;
    onBackButtonClick: () => void;
};

const Table: FC<PropsT> = (props) => {
    const { data, onBackButtonClick } = props;
    const [tableVariant, setTableVariant] = useState<TableVariantT>('class');
    const [isVisible, setIsVisible] = useState(false);

    const exportFile = async (type: ExportType) => {
        exportFromJSON({
            data: getData(tableVariant, data),
            fileName: 'GeneratedData',
            exportType: type,
        });
    };

    return (
        <Wrapper>
            <AntdTable
                title={() => (
                    <HeaderWrapper>
                        <Space>
                            <Button
                                type={tableVariant === 'class' ? 'primary' : 'default'}
                                onClick={() => setTableVariant('class')}
                            >
                                Классы
                            </Button>
                            <Button
                                type={tableVariant === 'feature' ? 'primary' : 'default'}
                                onClick={() => setTableVariant('feature')}
                            >
                                Признаки
                            </Button>
                            <Button
                                type={tableVariant === 'period' ? 'primary' : 'default'}
                                onClick={() => setTableVariant('period')}
                            >
                                ЧПД
                            </Button>
                            <Button
                                type={tableVariant === 'value' ? 'primary' : 'default'}
                                onClick={() => setTableVariant('value')}
                            >
                                ЗДП + ВГ, НГ
                            </Button>
                            <Button
                                type={tableVariant === 'possible' ? 'primary' : 'default'}
                                onClick={() => setTableVariant('possible')}
                            >
                                Возможные/нормальные значения
                            </Button>
                        </Space>
                        <Space>
                            <Button onClick={onBackButtonClick}>Назад</Button>
                            <Popover
                                visible={isVisible}
                                trigger="click"
                                onVisibleChange={(visible) => !visible && setIsVisible(false)}
                                content={
                                    <Space direction="vertical">
                                        <Button onClick={() => exportFile('csv')}>CSV</Button>
                                        <Button onClick={() => exportFile('xls')}>XLS</Button>
                                    </Space>
                                }
                            >
                                <Button
                                    icon={<DownloadOutlined />}
                                    type="primary"
                                    disabled={tableVariant === 'class' || tableVariant === 'period'}
                                    onClick={() => setIsVisible((prevState) => !prevState)}
                                >
                                    Скачать
                                </Button>
                            </Popover>
                        </Space>
                    </HeaderWrapper>
                )}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                dataSource={getData(tableVariant, data)}
                columns={getColumns(tableVariant)}
            />
        </Wrapper>
    );
};

export default Table;
