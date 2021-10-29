import Chance from 'chance';
import generateValues from './generateValues';

const chance = new Chance();

const generateBorders = () => {
    const topBorder = chance.integer({ min: 2, max: 12 });
    const bottomBorder = chance.integer({ min: 1, max: topBorder - 1 });

    return { topBorder, bottomBorder };
};

const generateValue = (interval: IntervalT): IntervalT => {
    const { from, to } = interval;
    const max = chance.integer({ min: from, max: to });
    const min = chance.integer({ min: from, max });

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

            for (let periodNumber = 1; periodNumber <= currentPeriodAmount; periodNumber++) {
                const interval = possibleValues[featureNumber];
                const { topBorder, bottomBorder } = generateBorders();

                values.push({
                    key: `${classNumber}-${featureNumber}-${periodNumber}`,
                    class: classNumber,
                    feature: featureNumber,
                    periodAmount: currentPeriodAmount,
                    period: periodNumber,
                    value: generateValue(interval),
                    bottomBorder,
                    topBorder,
                });
            }
        });
    });

    return { values, classes, features, possibleValues, normalValues, periods };
};

export default generateData;
