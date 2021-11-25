import Chance from 'chance';
import generateValues from './generateValues';

const chance = new Chance();

const generateBorders = () => {
    const topBorder = chance.integer({ min: 2, max: 12 });
    const bottomBorder = chance.integer({ min: 1, max: topBorder - 1 });

    return { topBorder, bottomBorder };
};

const generateValue = (interval: IntervalT, excludeInterval?: IntervalT): IntervalT => {
    const { from, to } = interval;
    const max = chance.integer({ min: from, max: to });
    const min = chance.integer({ min: from, max });

    if (excludeInterval && min <= excludeInterval.to && excludeInterval.from <= max) {
        const isPickLeftSideInterval = chance.bool();
        const leftInterval = {
            from: Math.min(interval.from, excludeInterval.from),
            to: Math.max(Math.max(interval.from, excludeInterval.from) - 1, interval.from),
        };
        const rightInterval = {
            from: Math.min(Math.min(interval.to, excludeInterval.to) + 1, interval.to),
            to: Math.max(interval.to, excludeInterval.to),
        };

        if (isPickLeftSideInterval && leftInterval.from !== leftInterval.to) {
            return generateValue(leftInterval);
        }

        return generateValue(rightInterval);
    }

    return {
        from: min,
        to: max,
    };
};

const generateData: GenerateFunctionT = async (params) => {
    const { classAmount, featureAmount, periodAmount } = params;
    const values: ValueT[] = [];
    const classes: number[] = Array.from({ length: classAmount }, (_, i) => i + 1);
    const features: number[] = Array.from({ length: featureAmount }, (_, i) => i + 1);
    const periods: PeriodsT[] = [];
    const { possibleValues, normalValues } = generateValues(featureAmount);

    classes.forEach((classNumber) => {
        features.forEach((featureNumber) => {
            const currentPeriodAmount = chance.integer({ min: 1, max: periodAmount });
            periods.push({
                class: classNumber,
                feature: featureNumber,
                periodAmount: currentPeriodAmount,
            });
            let prevPeriodValue: IntervalT | undefined;

            for (let periodNumber = 1; periodNumber <= currentPeriodAmount; periodNumber++) {
                const interval = possibleValues[featureNumber];
                const { topBorder, bottomBorder } = generateBorders();
                const periodValue = generateValue(interval, prevPeriodValue);

                values.push({
                    key: `${classNumber}-${featureNumber}-${periodNumber}`,
                    class: classNumber,
                    feature: featureNumber,
                    periodAmount: currentPeriodAmount,
                    period: periodNumber,
                    value: periodValue,
                    bottomBorder,
                    topBorder,
                });

                prevPeriodValue = periodValue;
            }
        });
    });

    return { values, classes, features, possibleValues, normalValues, periods };
};

export default generateData;
