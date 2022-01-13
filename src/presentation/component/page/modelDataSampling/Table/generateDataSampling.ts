import Chance from 'chance';

const chance = new Chance();

function generateObservationMoments(periodDuration: number): number[] {
    const result = [];
    let leftDuration = periodDuration;

    while (leftDuration > 0) {
        const momentDuration = chance.integer({ min: 1, max: leftDuration });
        result.push(momentDuration);
        leftDuration -= momentDuration;
    }

    return result;
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

    let medicalHistoryNumber = 1;

    Object.entries(groupByClasses).forEach(([classNum, classValues]) => {
        for (let i = 0; i < amount; i++, medicalHistoryNumber++) {
            for (let k = 0; k < classValues.length; ++k) {
                const value = classValues[k];
                const { from, to } = value.value;
                const periodDuration = chance.integer({
                    min: value.bottomBorder,
                    max: value.topBorder,
                });
                const momentDurations = generateObservationMoments(periodDuration);
                const moments = momentDurations.map(
                    (el, index) =>
                        el + momentDurations.slice(0, index).reduce((sum, e) => sum + e, 0),
                );

                for (let j = 0; j < moments.length; j++) {
                    result.push({
                        medicalHistoryNumber,
                        key: `${classNum}-${i}-${j}:${value.key}`,
                        class: value.class,
                        feature: value.feature,
                        value: chance.integer({ min: from, max: to }),
                        observationMomentsAmount: momentDurations.length,
                        moment: moments[j],
                        momentNumber: j,
                    });
                }
            }
        }
    });

    return result;
}
