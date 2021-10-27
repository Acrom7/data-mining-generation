import Chance from 'chance';

const chance = new Chance();

const generatePossibleValues = (featuresAmount: number): PossibleValuesT => {
    const result: PossibleValuesT = {};

    for (let featureNumber = 1; featureNumber <= featuresAmount; featureNumber++) {
        const max = chance.integer({ min: 2, max: 99 });
        const min = chance.integer({ min: 1, max });

        result[featureNumber] = {
            from: min,
            to: max,
        };
    }

    return result;
};

const generateNormalValues = (featuresAmount: number, possibleValues: PossibleValuesT): NormalValuesT => {
    const result: NormalValuesT = {};

    for (let featureNumber = 1; featureNumber <= featuresAmount; featureNumber++) {
        const { from, to } = possibleValues[featureNumber];
        const max = chance.integer({ min: from, max: to });
        const min = chance.integer({ min: from, max });
        result[featureNumber] = { from: min, to: max };
    }

    return result;
};

 const generateValues = (featuresAmount: number): { possibleValues: PossibleValuesT, normalValues: NormalValuesT } => {
    const possibleValues = generatePossibleValues(featuresAmount);
    const normalValues = generateNormalValues(featuresAmount, possibleValues);

    return { possibleValues, normalValues };
};

export default generateValues
