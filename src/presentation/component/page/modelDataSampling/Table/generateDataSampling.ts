import Chance from 'chance';

const chance = new Chance();

function divideIntoChunks(length: number, count: number): number[] {
    const arr = Array.from({ length }, (_, i) => i + 1);
    const res = [];
    const size = arr.length / count;
    let ind = 0;

    while (ind < arr.length) {
        res.push(arr.slice(ind, (ind += size)));
    }

    return res.map((el) => el.length);
}

export default function generateDataSampling(
    amount: number,
    values: ValueT[],
): DataSamplingTableRowT[] {
    const result: DataSamplingTableRowT[] = [];
    const groupByClasses = values.reduce((classes, value) => {
        if (Object.prototype.hasOwnProperty.call(classes, value.class)) {
            return {
                ...classes,
                [value.class]: [...classes[value.class], value],
            };
        }

        return {
            ...classes,
            [value.class]: [value],
        };
    }, {} as Record<ValueT['class'], ValueT[]>);

    Object.entries(groupByClasses).forEach(([classNum, classValues]) => {
        for (let i = 0; i < amount; i++) {
            classValues.forEach((value) => {
                const { from, to } = value.value;
                const periodDuration = chance.integer({
                    min: value.bottomBorder,
                    max: value.topBorder,
                });
                const observationMomentsAmount = chance.integer({ min: 1, max: periodDuration });
                const momentDurations = divideIntoChunks(periodDuration, observationMomentsAmount);

                for (let moment = 1; moment <= observationMomentsAmount; moment++) {
                    result.push({
                        key: `${classNum}-${i}-${moment}:${value.key}`,
                        period: value.period,
                        periodAmount: value.periodAmount,
                        class: value.class,
                        feature: value.feature,
                        value: chance.integer({ min: from, max: to }),
                        periodDuration,
                        observationMomentsAmount,
                        moment,
                        momentDuration: momentDurations[moment - 1],
                    });
                }
            });
        }
    });

    return result;
}
