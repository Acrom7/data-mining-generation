type IntervalT = {
    from: number,
    to: number,
}
type GenerateParameters = {
    classAmount: number,
    featureAmount: number,
    periodAmount: number,
}

type RowT = {
    key: number | string,
    class: number,
    feature: number,
    periodAmount: number,
    period: number,
    value: number
}

type GenerateFunctionT = (params: GenerateParameters) => Promise<RowT[]>

type PossibleValuesT = Record<number, IntervalT>

type NormalValuesT = Record<number, number>
