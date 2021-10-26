import Chance from 'chance';
import { generateValues } from 'presentation/component/page/home/generate/generateValues';

const chance = new Chance();

const generateData: GenerateFunctionT = async (params) => {
    const { classAmount, featureAmount, periodAmount } = params;
    const result: RowT[] = [];
    const { possibleValues, normalValues } = generateValues(featureAmount);

    for (let classNumber = 1; classNumber <= classAmount; classNumber++) {
        for (let featureNumber = 1; featureNumber <= featureAmount; featureNumber++) {
            const currentPeriodAmount = chance.integer({ min: 2, max: periodAmount });

            for (let periodNumber = 1; periodNumber <= currentPeriodAmount; periodNumber++) {
                const { from, to } = possibleValues[featureNumber];

                result.push({
                    key: `${classNumber}-${featureNumber}-${periodNumber}}`,
                    class: classNumber,
                    feature: featureNumber,
                    periodAmount: currentPeriodAmount,
                    period: periodNumber,
                    value: chance.integer({ min: from, max: to }),
                });
            }
        }
    }

    return result;
};

export default generateData;
