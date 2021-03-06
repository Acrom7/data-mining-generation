import React, { FC, useState } from 'react';
import { Button, Space, Table as AntdTable } from 'antd';
import { HeaderWrapper } from 'presentation/component/page/modelKnowledgeBase/Table/styles';
import { getColumns, getData, TableVariantT } from './mapTableVariantToData';

type PropsT = {
    modelValues: ValueT[];
    inductiveValues: ValueT[];
};

const Table: FC<PropsT> = (props) => {
    const { modelValues, inductiveValues } = props;
    const [tableVariant, setTableVariant] = useState<TableVariantT>('periods');

    return (
        <AntdTable
            title={() => (
                <HeaderWrapper>
                    <Space>
                        <Button
                            type={tableVariant === 'periods' ? 'primary' : 'default'}
                            onClick={() => setTableVariant('periods')}
                        >
                            ЧПД
                        </Button>
                        <Button
                            type={tableVariant === 'periods-percent' ? 'primary' : 'default'}
                            onClick={() => setTableVariant('periods-percent')}
                        >
                            ЧПД (проценты)
                        </Button>
                        <Button
                            type={tableVariant === 'values' ? 'primary' : 'default'}
                            onClick={() => setTableVariant('values')}
                        >
                            ЗДП
                        </Button>
                        <Button
                            type={tableVariant === 'values-percent' ? 'primary' : 'default'}
                            onClick={() => setTableVariant('values-percent')}
                        >
                            ЗДП (проценты)
                        </Button>
                    </Space>
                </HeaderWrapper>
            )}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            dataSource={getData(tableVariant, { modelValues, inductiveValues })}
            columns={getColumns(tableVariant)}
        />
    );
};

export default Table;
