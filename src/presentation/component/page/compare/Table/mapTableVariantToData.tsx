import { TableColumnType } from 'antd';

export type TableVariantT = 'periods';

// eslint-disable-next-line @typescript-eslint/ban-types
export function getColumns(variant: TableVariantT): TableColumnType<object>[] {
    if (variant === 'periods') {
        return [
            {
                title: 'Класс',
                dataIndex: ['model', 'class'],
                render: (value) => `Заболевание${value}`,
            },
            {
                title: 'Признак',
                dataIndex: ['model', 'feature'],
                render: (value) => `Признак${value}`,
            },
            {
                title: 'ЧПД (МБЗ)',
                dataIndex: ['model', 'periodAmount'],
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                render: (value, { model, inductive }: CompareValueT) => {
                    const isCorrect = model.periodAmount === inductive.periodAmount;

                    return <div style={{ background: !isCorrect ? '#ffffc9' : '' }}>{value}</div>;
                },
            },
            {
                title: 'ЧПД (ИФБЗ)',
                dataIndex: ['inductive', 'periodAmount'],
                className: 'asd',
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                render: (value, { model, inductive }: CompareValueT) => {
                    const isCorrect = model.periodAmount === inductive.periodAmount;

                    return <div style={{ background: !isCorrect ? '#ffffc9' : '' }}>{value}</div>;
                },
            },
        ];
    }

    return [];
}

export function getData(
    variant: TableVariantT,
    data: {
        modelValues: ValueT[];
        inductiveValues: ValueT[];
    },
) {
    const { modelValues, inductiveValues } = data;

    const res: CompareValueT[] = modelValues
        .filter((el) => el.period === 1)
        .map((origin) => {
            const inductiveOrigin = inductiveValues.find(
                (value) => value.class === origin.class && value.feature === origin.feature,
            );

            if (inductiveOrigin) {
                return {
                    model: origin,
                    inductive: inductiveOrigin,
                };
            }

            return null;
        })
        .filter((el): el is CompareValueT => el !== null);

    return res;
}
