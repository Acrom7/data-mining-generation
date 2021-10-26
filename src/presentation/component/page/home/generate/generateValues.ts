import Chance from 'chance';

const chance = new Chance();

const generatePossibleValues = (featuresAmount: number): PossibleValuesT => {
    const result: PossibleValuesT = {};

    for (let featureNumber = 1; featureNumber <= featuresAmount; featureNumber++) {
        result[featureNumber] = {
            from: 1,
            to: 2,
        };
    }

    return result;
};

const generateNormalValues = (featuresAmount: number, possibleValues: PossibleValuesT): NormalValuesT => {
    const result: NormalValuesT = {};

    for (let featureNumber = 1; featureNumber <= featuresAmount; featureNumber++) {
        result[featureNumber] = 1;
    }

    return result;
};

export const generateValues = (featuresAmount: number): { possibleValues: PossibleValuesT, normalValues: NormalValuesT } => {
    const possibleValues = generatePossibleValues(featuresAmount);
    const normalValues = generateNormalValues(featuresAmount, possibleValues);

    return { possibleValues, normalValues };
};
