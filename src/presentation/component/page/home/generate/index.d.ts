type IntervalT = {
    from: number,
    to: number,
}
type GenerateParameter = {
    classesAmount: number,
    featureAmount: number,
    maxPeriodAmount: number,
}

type RowT = {
    key: number | string,
    class: number,
    feature: number,
    periodAmount: number,
    period: number,
    value: number
}

type GenerateFunctionT = (params: GenerateParameter) => Promise<RowT[]>

type PossibleValuesT = Record<number, IntervalT>

type NormalValuesT = Record<number, number>
