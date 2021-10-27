import Chance from 'chance';
import { generateValues } from 'presentation/component/page/home/generate/generateValues';

const chance = new Chance();

const generateData: GenerateFunctionT = async (params) => {
    const { classAmount, featureAmount, periodAmount } = params;
    const values: ValueT[] = [];
    const classes: number[] = Array.from({ length: classAmount }, (_, i) => i + 1);
    const features: number[] = Array.from({ length: featureAmount }, (_, i) => i + 1);
    const { possibleValues, normalValues } = generateValues(featureAmount);

    classes.forEach(classNumber => {
        features.forEach(featureNumber => {
            const currentPeriodAmount = chance.integer({ min: 2, max: periodAmount });

            for (let periodNumber = 1; periodNumber <= currentPeriodAmount; periodNumber++) {
                const { from, to } = possibleValues[featureNumber];

                values.push({
                    key: `${classNumber}-${featureNumber}-${periodNumber}}`,
                    class: classNumber,
                    feature: featureNumber,
                    periodAmount: currentPeriodAmount,
                    period: periodNumber,
                    value: chance.integer({ min: from, max: to }),
                });
            }
        });
    });

    return { values, classes, features };
};

export default generateData;
