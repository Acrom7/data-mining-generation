import { TableColumnType } from 'antd';
import compareInterval from 'helper/interval/compareInterval';
import intervalToString from 'helper/interval/intervalToString';

export type TableVariantT = 'periods' | 'periods-percent' | 'values' | 'values-percent';

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

    if (variant === 'values-percent') {
        return [
            {
                title: 'Класс',
                dataIndex: ['value', 'class'],
                render: (value) => `Заболевание${value}`,
            },
            {
                title: 'Совпадает',
                render: ({ totalAmount, equalAmount }: ValuesPercentT) => {
                    return ((equalAmount / totalAmount) * 100).toFixed(2);
                },
            },
            {
                title: 'МБЗ подмножество ИФБЗ',
                render: ({ totalAmount, subset12Amount }: ValuesPercentT) => {
                    return ((subset12Amount / totalAmount) * 100).toFixed(2);
                },
            },
            {
                title: 'ИФБЗ подмножеств МБФ',
                render: ({ totalAmount, subset21Amount }: ValuesPercentT) => {
                    return ((subset21Amount / totalAmount) * 100).toFixed(2);
                },
            },
            {
                title: 'Остальные случаи',
                render: ({ totalAmount, unknownAmount }: ValuesPercentT) => {
                    return ((unknownAmount / totalAmount) * 100).toFixed(2);
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

    if (variant === 'values-percent') {
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

        const percentRes: ValuesPercentT[] = [];

        res.forEach(({ model, inductive }) => {
            const compareValueResult = compareInterval(model.value, inductive.value);

            const currentDisease = percentRes.find((el) => el.value.class === model.class);

            if (currentDisease) {
                if (compareValueResult === 'equal') {
                    currentDisease.equalAmount += 1;
                }

                if (compareValueResult === '1subsetOf2') {
                    currentDisease.subset12Amount += 1;
                }

                if (compareValueResult === '2subsetOf1') {
                    currentDisease.subset21Amount += 1;
                }

                if (compareValueResult === 'unknown') {
                    currentDisease.unknownAmount += 1;
                }

                currentDisease.totalAmount += 1;
            } else {
                percentRes.push({
                    value: model,
                    equalAmount: compareValueResult === 'equal' ? 1 : 0,
                    subset12Amount: compareValueResult === '1subsetOf2' ? 1 : 0,
                    subset21Amount: compareValueResult === '2subsetOf1' ? 1 : 0,
                    unknownAmount: compareValueResult === 'unknown' ? 1 : 0,
                    totalAmount: 1,
                });
            }
        });

        return percentRes;
    }
}
