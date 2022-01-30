import { mergeIntervals } from './combine';

function combineValuesToInterval<T extends { value: number }>(values: T[]): IntervalT {
    const dirtyValues = values.map(el => el.value);

    return {
        from: Math.min(...dirtyValues),
        to: Math.max(...dirtyValues),
    };
};

function isIntervalsIntersect(int1: IntervalT, int2: IntervalT): boolean {
    return int1.to >= int2.from && int2.to >= int1.from;
}

function isSomeNeighboringIntervalsIntersect(...intervals: IntervalT[]): boolean {
    for (let i = 1; i < intervals.length; i++) {
        if (isIntervalsIntersect(intervals[i], intervals[i - 1])) {
            return true;
        }
    }

    return false;
}

function isValuesIntervalsIntersect(...values: ValueT[]): boolean {
    for (let i = 1; i < values.length; i++) {
        if (isIntervalsIntersect(values[i].value, values[i - 1].value)) {
            return true;
        }
    }

    return false;
}

function mergeValues(...values: ValueT[]): ValueT {
    const bottomBorders: number[] = [];
    const topBorders: number[] = [];
    const intervals: IntervalT[] = [];

    for (let i = 0; i < values.length; ++i) {
        bottomBorders.push(values[i].bottomBorder);
        topBorders.push(values[i].topBorder);
        intervals.push(values[i].value);
    }

    return {
        ...values[0],
        bottomBorder: Math.min(...bottomBorders),
        topBorder: Math.max(...topBorders),
        value: mergeIntervals(...intervals),
    };
}

export function mergeAlternatives(alternatives: ValueT[][], periodAmount: number): ValueT[] {
    if (alternatives.length === 0) {
        return [];
    }

    const periodsValues: ValueT[] = [];

    for (let j = 0; j < periodAmount; j++) {
        const currentPeriodValues: ValueT[] = [];

        for (let i = 0; i < alternatives.length; ++i) {
            currentPeriodValues.push(alternatives[i][j]);
        }

        periodsValues.push(mergeValues(...currentPeriodValues));
    }

    if (isValuesIntervalsIntersect(...periodsValues)) {
        return [];
    }

    return periodsValues;
};

export function getAlternativesFor1Periods(values: ThirdValueT[]): ValueT[] {
    const alternatives: ValueT[][] = [];
    const periodValueInterval = combineValuesToInterval(values);
    const firstValue = values[0];
    const border = {
        bottom: values[0].moment,
        top: values[values.length - 1].moment,
    };

    alternatives.push([
        {
            feature: firstValue.feature,
            class: firstValue.class,
            key: firstValue.key,
            periodAmount: 1,
            value: periodValueInterval,
            bottomBorder: border.bottom,
            topBorder: border.top,
            period: 1,
        },
    ]);

    return mergeAlternatives(alternatives, 1);
}

export function getAlternativesFor2Periods(values: ThirdValueT[]): ValueT[] {
    const alternatives: ValueT[][] = [];

    for (let i = 1; i < values.length; ++i) {
        const period1 = values.slice(0, i);
        const period2 = values.slice(i);
        const periodValueInterval1 = combineValuesToInterval(period1);
        const periodValueInterval2 = combineValuesToInterval(period2);
        const middlePeriodBorder = Math.floor(
            (period1[period1.length - 1].moment + period2[0].moment) / 2,
        );

        if (!isIntervalsIntersect(periodValueInterval1, periodValueInterval2)) {
            const border1 = {
                bottom: period1[0].moment,
                top: period1[period1.length - 1].moment,
            };
            const border2 = {
                bottom: period2[0].moment - middlePeriodBorder,
                top: period2[period2.length - 1].moment - middlePeriodBorder,
            };
            alternatives.push([
                {
                    ...values[0],
                    periodAmount: 2,
                    value: periodValueInterval1,
                    bottomBorder: border1.bottom,
                    topBorder: border1.top,
                    period: 1,
                },
                {
                    ...values[0],
                    periodAmount: 2,
                    value: periodValueInterval2,
                    bottomBorder: border2.bottom,
                    topBorder: border2.top,
                    period: 2,
                },
            ]);
        }
    }

    return mergeAlternatives(alternatives, 2);
}

export function getAlternativesFor3Periods(values: ThirdValueT[]): ValueT[] {
    const alternatives: ValueT[][] = [];

    for (let i = 1; i < values.length - 1; ++i) {
        for (let j = i + 1; j < values.length; j++) {
            const period1 = values.slice(0, i);
            const period2 = values.slice(i, j);
            const period3 = values.slice(j);
            const periodValueInterval1 = combineValuesToInterval(period1);
            const periodValueInterval2 = combineValuesToInterval(period2);
            const periodValueInterval3 = combineValuesToInterval(period3);
            const firstPeriodBorder = Math.floor(
                (period1[period1.length - 1].moment + period2[0].moment) / 2,
            );
            const secondPeriodBorder = Math.floor(
                (period2[period2.length - 1].moment + period2[0].moment) / 2,
            );

            if (!isSomeNeighboringIntervalsIntersect(periodValueInterval1, periodValueInterval2, periodValueInterval3)) {
                const border1 = {
                    bottom: period1[0].moment,
                    top: period1[period1.length - 1].moment,
                };
                const border2 = {
                    bottom: period2[0].moment - firstPeriodBorder,
                    top: period2[period2.length - 1].moment - firstPeriodBorder,
                };
                const border3 = {
                    bottom: period3[0].moment - secondPeriodBorder,
                    top: period3[period3.length - 1].moment - secondPeriodBorder,
                };
                alternatives.push([
                    {
                        ...values[0],
                        periodAmount: 3,
                        value: periodValueInterval1,
                        bottomBorder: border1.bottom,
                        topBorder: border1.top,
                        period: 1,
                    },
                    {
                        ...values[0],
                        periodAmount: 3,
                        value: periodValueInterval2,
                        bottomBorder: border2.bottom,
                        topBorder: border2.top,
                        period: 2,
                    },
                    {
                        ...values[0],
                        periodAmount: 3,
                        value: periodValueInterval3,
                        bottomBorder: border3.bottom,
                        topBorder: border3.top,
                        period: 3,
                    },
                ]);
            }
        }
    }

    return mergeAlternatives(alternatives, 3);
}

export function getAlternativesFor4Periods(values: ThirdValueT[]): ValueT[] {
    const alternatives: ValueT[][] = [];

    for (let i = 1; i < values.length - 2; ++i) {
        for (let j = i + 1; j < values.length - 1; j++) {
            for (let k = j + 1; k < values.length; k++) {
                const period1 = values.slice(0, i);
                const period2 = values.slice(i, j);
                const period3 = values.slice(j, k);
                const period4 = values.slice(k);
                const periodValueInterval1 = combineValuesToInterval(period1);
                const periodValueInterval2 = combineValuesToInterval(period2);
                const periodValueInterval3 = combineValuesToInterval(period3);
                const periodValueInterval4 = combineValuesToInterval(period4);
                const firstPeriodBorder = Math.floor(
                    (period1[period1.length - 1].moment + period2[0].moment) / 2,
                );
                const secondPeriodBorder = Math.floor(
                    (period2[period2.length - 1].moment + period2[0].moment) / 2,
                );
                const thirdPeriodBorder = Math.floor(
                    (period3[period3.length - 1].moment + period3[0].moment) / 2,
                );

                if (!isSomeNeighboringIntervalsIntersect(periodValueInterval1, periodValueInterval2, periodValueInterval3, periodValueInterval4)) {
                    const border1 = {
                        bottom: period1[0].moment,
                        top: period1[period1.length - 1].moment,
                    };
                    const border2 = {
                        bottom: period2[0].moment - firstPeriodBorder,
                        top: period2[period2.length - 1].moment - firstPeriodBorder,
                    };
                    const border3 = {
                        bottom: period3[0].moment - secondPeriodBorder,
                        top: period3[period3.length - 1].moment - secondPeriodBorder,
                    };
                    const border4 = {
                        bottom: period4[0].moment - thirdPeriodBorder,
                        top: period4[period4.length - 1].moment - thirdPeriodBorder,
                    };
                    alternatives.push([
                        {
                            ...values[0],
                            periodAmount: 4,
                            value: periodValueInterval1,
                            bottomBorder: border1.bottom,
                            topBorder: border1.top,
                            period: 1,
                        },
                        {
                            ...values[0],
                            periodAmount: 4,
                            value: periodValueInterval2,
                            bottomBorder: border2.bottom,
                            topBorder: border2.top,
                            period: 2,
                        },
                        {
                            ...values[0],
                            periodAmount: 4,
                            value: periodValueInterval3,
                            bottomBorder: border3.bottom,
                            topBorder: border3.top,
                            period: 3,
                        },
                        {
                            ...values[0],
                            periodAmount: 4,
                            value: periodValueInterval4,
                            bottomBorder: border4.bottom,
                            topBorder: border4.top,
                            period: 4,
                        },
                    ]);
                }
            }
        }
    }

    return mergeAlternatives(alternatives, 4);
}

export function getAlternativesFor5Periods(values: ThirdValueT[]): ValueT[] {
    const alternatives: ValueT[][] = [];

    for (let i = 1; i < values.length - 3; ++i) {
        for (let j = i + 1; j < values.length - 2; ++j) {
            for (let k = j + 1; k < values.length - 1; ++k) {
                for (let l = k + 1; l < values.length; ++l) {
                    const period1 = values.slice(0, i);
                    const period2 = values.slice(i, j);
                    const period3 = values.slice(j, k);
                    const period4 = values.slice(k, l);
                    const period5 = values.slice(l);
                    const periodValueInterval1 = combineValuesToInterval(period1);
                    const periodValueInterval2 = combineValuesToInterval(period2);
                    const periodValueInterval3 = combineValuesToInterval(period3);
                    const periodValueInterval4 = combineValuesToInterval(period4);
                    const periodValueInterval5 = combineValuesToInterval(period5);
                    const firstPeriodBorder = Math.floor(
                        (period1[period1.length - 1].moment + period2[0].moment) / 2,
                    );
                    const secondPeriodBorder = Math.floor(
                        (period2[period2.length - 1].moment + period2[0].moment) / 2,
                    );
                    const thirdPeriodBorder = Math.floor(
                        (period3[period3.length - 1].moment + period3[0].moment) / 2,
                    );
                    const fourthPeriodBorder = Math.floor(
                        (period4[period4.length - 1].moment + period4[0].moment) / 2,
                    );

                    if (!isSomeNeighboringIntervalsIntersect(
                        periodValueInterval1,
                        periodValueInterval2,
                        periodValueInterval3,
                        periodValueInterval4,
                        periodValueInterval5,
                    )) {
                        const border1 = {
                            bottom: period1[0].moment,
                            top: period1[period1.length - 1].moment,
                        };
                        const border2 = {
                            bottom: period2[0].moment - firstPeriodBorder,
                            top: period2[period2.length - 1].moment - firstPeriodBorder,
                        };
                        const border3 = {
                            bottom: period3[0].moment - secondPeriodBorder,
                            top: period3[period3.length - 1].moment - secondPeriodBorder,
                        };
                        const border4 = {
                            bottom: period4[0].moment - thirdPeriodBorder,
                            top: period4[period4.length - 1].moment - thirdPeriodBorder,
                        };
                        const border5 = {
                            bottom: period5[0].moment - fourthPeriodBorder,
                            top: period5[period5.length - 1].moment - fourthPeriodBorder,
                        };
                        alternatives.push([
                            {
                                ...values[0],
                                periodAmount: 5,
                                value: periodValueInterval1,
                                bottomBorder: border1.bottom,
                                topBorder: border1.top,
                                period: 1,
                            },
                            {
                                ...values[0],
                                periodAmount: 5,
                                value: periodValueInterval2,
                                bottomBorder: border2.bottom,
                                topBorder: border2.top,
                                period: 2,
                            },
                            {
                                ...values[0],
                                periodAmount: 5,
                                value: periodValueInterval3,
                                bottomBorder: border3.bottom,
                                topBorder: border3.top,
                                period: 3,
                            },
                            {
                                ...values[0],
                                periodAmount: 5,
                                value: periodValueInterval4,
                                bottomBorder: border4.bottom,
                                topBorder: border4.top,
                                period: 4,
                            },
                            {
                                ...values[0],
                                periodAmount: 5,
                                value: periodValueInterval5,
                                bottomBorder: border5.bottom,
                                topBorder: border5.top,
                                period: 5,
                            },
                        ]);
                    }
                }
            }
        }
    }

    return mergeAlternatives(alternatives, 5);
}
