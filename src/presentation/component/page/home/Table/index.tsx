import React, { FC, useState } from 'react';
import { Table as AntdTable, Button, Space } from 'antd';
import { Wrapper } from './styles';
import { getColumns, getData, TableVariantT } from './mapTableVariantToData';

type PropsT = {
    data: GenerateReturnT;
    onBackButtonClick: () => void;
}

const Table: FC<PropsT> = (props) => {
    const { data, onBackButtonClick } = props;
    const [tableVariant, setTableVariant] = useState<TableVariantT>('class')

    return (
        <Wrapper>
            <AntdTable
                title={() => (
                    <Space>
                        <Button type={tableVariant === 'class' ? 'primary' : 'default'} onClick={() => setTableVariant('class')}>Классы</Button>
                        <Button type={tableVariant === 'feature' ? 'primary' : 'default'} onClick={() => setTableVariant('feature')}>Признаки</Button>
                        <Button type={tableVariant === 'value' ? 'primary' : 'default'} onClick={() => setTableVariant('value')}>ЗДП</Button>
                        <Button onClick={onBackButtonClick}>Назад</Button>
                    </Space>
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
