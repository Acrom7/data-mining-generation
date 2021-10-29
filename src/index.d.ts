type IntervalT = {
    from: number;
    to: number;
};
type GenerateParameters = {
    classAmount: number;
    featureAmount: number;
    periodAmount: number;
};

type ValueT = {
    key: number | string;
    class: number;
    feature: number;
    periodAmount: number;
    period: number;
    value: IntervalT;
    bottomBorder: number;
    topBorder: number;
};

type GenerateReturnT = {
    values: ValueT[];
    classes: number[];
    features: number[];
    possibleValues: PossibleValuesT;
    normalValues: NormalValuesT;
    periods: PeriodsT[];
};

type GenerateFunctionT = (params: GenerateParameters) => Promise<GenerateReturnT>;

type PossibleValuesT = Record<number, IntervalT>;

type NormalValuesT = Record<number, IntervalT>;

type PeriodsT = { class: number; feature: number; periodAmount: number };
