import { TableColumnType } from 'antd';
import compareInterval from 'helper/interval/compareInterval';
import intervalToString from 'helper/interval/intervalToString';

export type TableVariantT = 'periods' | 'periods-percent' | 'values';

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
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                render: (value, { model, inductive }: CompareValueT) => {
                    const isCorrect = model.periodAmount === inductive.periodAmount;

                    return <div style={{ background: !isCorrect ? '#ffffc9' : '' }}>{value}</div>;
                },
            },
        ];
    }

    if (variant === 'periods-percent') {
        return [
            {
                title: 'Класс',
                dataIndex: ['value', 'class'],
                render: (value) => `Заболевание${value}`,
            },
            {
                title: 'Процент совпавших значений',
                render: ({ correctAmount, totalAmount }: PeriodsPercentT) => {
                    return ((correctAmount / totalAmount) * 100).toFixed(2);
                },
            },
        ];
    }

    if (variant === 'values') {
        const mapCompareResultToColor: Record<ReturnType<typeof compareInterval>, string> = {
            'equal': '#b9ffb9',
            '1subsetOf2': '#fefecc',
            '2subsetOf1': '#babaff',
            'unknown': '#ffb4b4',
        };

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
                title: 'ЗДП (МБЗ)',
                render: ({ inductive, model }: CompareValueT) => {
                    const compareValueResult = compareInterval(model.value, inductive.value);

                    return (
                        <div style={{ background: mapCompareResultToColor[compareValueResult] }}>
                            {intervalToString(model.value)}
                        </div>
                    );
                },
            },
            {
                title: 'ЗДП (ИФБЗ)',
                render: ({ inductive, model }: CompareValueT) => {
                    const compareValueResult = compareInterval(model.value, inductive.value);

                    return (
                        <div style={{ background: mapCompareResultToColor[compareValueResult] }}>
                            {intervalToString(inductive.value)}
                        </div>
                    );
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

    if (variant === 'periods' || variant === 'values') {
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

    if (variant === 'periods-percent') {
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

        const percentRes: PeriodsPercentT[] = [];

        res.forEach(({ model, inductive }) => {
            const isCorrect = model.periodAmount === inductive.periodAmount;

            const currentDisease = percentRes.find((el) => el.value.class === model.class);

            if (currentDisease) {
                if (isCorrect) {
                    currentDisease.correctAmount += 1;
                }

                currentDisease.totalAmount += 1;
            } else {
                percentRes.push({
                    value: model,
                    correctAmount: isCorrect ? 1 : 0,
                    totalAmount: 1,
                });
            }
        });

        return percentRes;
    }
}
