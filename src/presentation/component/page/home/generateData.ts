type IntervalT = {
    from: number,
    to: number,
}
type GenerateParameter = {
    classesAmount: number,
    featureAmount: number,
    periodAmount: number,
    availableValues: IntervalT,
}

export type RowT = {
    key: number | string,
    class: number,
    feature: number,
    period: number
}

type GenerateFunctionT = (params: GenerateParameter) => Promise<RowT[]>

const generateData: GenerateFunctionT = async (params) => {
    const { classesAmount, featureAmount, periodAmount } = params;
    const result: RowT[] = [];

    for (let classNumber = 1; classNumber <= classesAmount; classNumber++) {
        for (let featureNumber = 1; featureNumber <= featureAmount; featureNumber++) {
            for (let periodNumber = 1; periodNumber <= periodAmount; periodNumber++) {
                result.push({
                    key: `${classNumber}-${featureNumber}-${periodNumber}}`,
                    class: classNumber,
                    feature: featureNumber,
                    period: periodNumber,
                });
            }
        }
    }

    return result;
};

export default generateData;
