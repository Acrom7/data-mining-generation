function combineBy<Key extends keyof ThirdValueT>(values: ThirdValueT[], key: Key): {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    [key: Key]: ThirdValueT[Key],
    values: ThirdValueT[]
}[] {
    const record: Record<ThirdValueT[Key], ThirdValueT[]> = values.reduce((result, value) => {
        if (Object.prototype.hasOwnProperty.call(result, value[key])) {
            return {
                ...result,
                [value[key]]: [...result[value[key]], value],
            };
        }

        return {
            ...result,
            [value[key]]: [value],
        };
    }, {} as Record<ThirdValueT[Key], ThirdValueT[]>);

    return Object.entries(record).map(([keyValue, historyValues]) => ({
        [key]: Number(keyValue),
        values: historyValues as ThirdValueT[],
    }));
}

export function combineByMedicalHistoryNumber(values: ThirdValueT[]): {
    medicalHistoryNumber: ThirdValueT['medicalHistoryNumber'],
    values: ThirdValueT[]
}[] {
    return combineBy<'medicalHistoryNumber'>(values, 'medicalHistoryNumber') as {
        medicalHistoryNumber: ThirdValueT['medicalHistoryNumber'],
        values: ThirdValueT[]
    }[];
}

export function combineByFeature(values: ThirdValueT[]): {
    feature: ThirdValueT['feature'],
    values: ThirdValueT[]
}[] {
    return combineBy<'feature'>(values, 'feature') as {
        feature: ThirdValueT['feature'],
        values: ThirdValueT[]
    }[];
}


export function mergeValueToInterval(int: IntervalT, value: ThirdValueT): IntervalT {
    const min = Math.min(int.from, value.value);
    const max = Math.max(int.to, value.value);

    return {
        from: min,
        to: max,
    };
}

export function mergeIntervals(...intervals: IntervalT[]): IntervalT {
    const min = Math.min(...intervals.map(el => el.from));
    const max = Math.max(...intervals.map(el => el.to));

    return {
        from: min,
        to: max,
    };
}
