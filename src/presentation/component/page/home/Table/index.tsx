import React, { FC, useState } from 'react';
import { Table as AntdTable, Button, Space } from 'antd';
import { getColumns, getData, TableVariantT } from './mapTableVariantToData';
import { HeaderWrapper, Wrapper } from './styles';

type PropsT = {
    data: GenerateReturnT;
    onBackButtonClick: () => void;
}

const Table: FC<PropsT> = (props) => {
    const { data, onBackButtonClick } = props;
    const [tableVariant, setTableVariant] = useState<TableVariantT>('class');

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
