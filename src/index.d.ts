type IntervalT = {
    from: number,
    to: number,
}
type GenerateParameters = {
    classAmount: number,
    featureAmount: number,
    periodAmount: number,
}

type ValueT = {
    key: number | string,
    class: number,
    feature: number,
    periodAmount: number,
    period: number,
    value: number
}

type GenerateReturnT = {values: ValueT[], classes: number[], features: number[]}
type GenerateFunctionT = (params: GenerateParameters) => Promise<GenerateReturnT>

type PossibleValuesT = Record<number, IntervalT>

type NormalValuesT = Record<number, number>
