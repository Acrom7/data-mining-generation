import Chance from 'chance';
import { generateValues } from 'presentation/component/page/home/generate/generateValues';

const chance = new Chance();

const generateData: GenerateFunctionT = async (params) => {
    const { classesAmount, featureAmount, maxPeriodAmount } = params;
    const result: RowT[] = [];
    const { possibleValues, normalValues } = generateValues(featureAmount);

    for (let classNumber = 1; classNumber <= classesAmount; classNumber++) {
        for (let featureNumber = 1; featureNumber <= featureAmount; featureNumber++) {
            const periodAmount = chance.integer({ min: 2, max: maxPeriodAmount });

            for (let periodNumber = 1; periodNumber <= periodAmount; periodNumber++) {
                const { from, to } = possibleValues[periodNumber];

                result.push({
                    key: `${classNumber}-${featureNumber}-${periodNumber}}`,
                    class: classNumber,
                    feature: featureNumber,
                    periodAmount,
                    period: periodNumber,
                    value: chance.integer({ min: from, max: to }),
                });
            }
        }
    }

    return result;
};

export default generateData;
