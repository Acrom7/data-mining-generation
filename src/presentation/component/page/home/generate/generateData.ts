import Chance from 'chance';
import generateValues from './generateValues';

const chance = new Chance();

const generateBorders = () => {
    const topBorder = chance.integer({ min: 2, max: 12 });
    const bottomBorder = chance.integer({ min: 1, max: topBorder });

    return { topBorder, bottomBorder };
};

const generateData: GenerateFunctionT = async (params) => {
    const { classAmount, featureAmount, periodAmount } = params;
    const values: ValueT[] = [];
    const classes: number[] = Array.from({ length: classAmount }, (_, i) => i + 1);
    const features: number[] = Array.from({ length: featureAmount }, (_, i) => i + 1);
    const periods: PeriodsT[] = [];
    const { possibleValues, normalValues } = generateValues(featureAmount);

    classes.forEach(classNumber => {
        features.forEach(featureNumber => {
            const currentPeriodAmount = chance.integer({ min: 1, max: periodAmount });
            periods.push({ class: classNumber, feature: featureNumber, periodAmount: currentPeriodAmount });

            for (let periodNumber = 1; periodNumber <= currentPeriodAmount; periodNumber++) {
                const { from, to } = possibleValues[featureNumber];
                const {topBorder, bottomBorder} = generateBorders()

                values.push({
                    key: `${classNumber}-${featureNumber}-${periodNumber}`,
                    class: classNumber,
                    feature: featureNumber,
                    periodAmount: currentPeriodAmount,
                    period: periodNumber,
                    value: chance.integer({ min: from, max: to }),
                    bottomBorder,
                    topBorder,
                });
            }
        });
    });

    return { values, classes, features, possibleValues, normalValues, periods };
};

export default generateData;
