import { combineByFeature, combineByMedicalHistoryNumber } from './combine';
import {
    getAlternativesFor1Periods,
    getAlternativesFor2Periods,
    getAlternativesFor3Periods,
    getAlternativesFor4Periods,
    getAlternativesFor5Periods,
    mergeAlternatives,
} from './generateAlternatives';

export function recoveryDataKnowledgeBase(values: ThirdValueT[]): ValueT[] {
    const groupedByMedicalHistoryNumber = combineByMedicalHistoryNumber(values);
    const groupedByMedicalHistoryNumberAndFeature = groupedByMedicalHistoryNumber.map(({
                                                                                           medicalHistoryNumber,
                                                                                           values,
                                                                                       }) => ({
        medicalHistoryNumber,
        values: combineByFeature(values),
    }));

    const resultGroupedByClass: Record<ValueT['class'], Record<ValueT['feature'], Record<ValueT['periodAmount'], ValueT[][]>>> = {};
    const appendClassValuesToResult = (values: ValueT[], currentClass: ValueT['class'], feature: ValueT['feature'], periodAmount: ValueT['periodAmount']) => {
        if (resultGroupedByClass.hasOwnProperty(currentClass)) {
            if (resultGroupedByClass[currentClass].hasOwnProperty(feature)) {
                if (resultGroupedByClass[currentClass][feature].hasOwnProperty(periodAmount)) {
                    resultGroupedByClass[currentClass][feature][periodAmount] = [...resultGroupedByClass[currentClass][feature][periodAmount], values];
                } else {
                    resultGroupedByClass[currentClass][feature][periodAmount] = [values];
                }
            } else {
                resultGroupedByClass[currentClass][feature] = {
                    [periodAmount]: [values],
                };
            }
        } else {
            resultGroupedByClass[currentClass] = {
                [feature]: {
                    [periodAmount]: [values],
                },
            };
        }
    };

    groupedByMedicalHistoryNumberAndFeature.forEach(({ values: historyValues }) => {
        historyValues.forEach(({ values: featureValues }) => {
            const currentFeatureValues = [...featureValues];
            currentFeatureValues.sort((a, b) => a.moment - b.moment);

            const fivePeriods = getAlternativesFor5Periods(currentFeatureValues);

            if (fivePeriods.length !== 0) {
                appendClassValuesToResult(fivePeriods, fivePeriods[0].class, fivePeriods[0].feature, 5);
            }

            const fourPeriods = getAlternativesFor4Periods(currentFeatureValues);

            if (fourPeriods.length !== 0) {
                appendClassValuesToResult(fourPeriods, fourPeriods[0].class, fourPeriods[0].feature, 4);
            }

            const threePeriods = getAlternativesFor3Periods(currentFeatureValues);

            if (threePeriods.length !== 0) {
                appendClassValuesToResult(threePeriods, threePeriods[0].class, threePeriods[0].feature, 3);
            }

            const twoPeriods = getAlternativesFor2Periods(currentFeatureValues);

            if (twoPeriods.length !== 0) {
                appendClassValuesToResult(twoPeriods, twoPeriods[0].class, twoPeriods[0].feature, 2);
            }

            const onePeriod = getAlternativesFor1Periods(currentFeatureValues);

            if (onePeriod.length !== 0) {
                appendClassValuesToResult(onePeriod, onePeriod[0].class, onePeriod[0].feature, 1);
            }
        });
    });

    return mergeMedicalHistoryValues(resultGroupedByClass);
}

function mergeMedicalHistoryValues(values: Record<ValueT['class'], Record<ValueT['feature'], Record<ValueT['periodAmount'], ValueT[][]>>>): ValueT[] {
    const result: ValueT[] = [];

    Object.entries(values).forEach(([className, features]) => {
        Object.entries(features).forEach(([feature, periods]) => {
            const periodsAlternatives = Object.entries(periods).map(([period, periodValues]) => ({
                periodAmount: Number(period),
                periodValues,
            }));

            let currentPeriodsResult: ValueT[] = [];
            let currentMaxPeriodAmount = 0;

            for (let i = 0; i < periodsAlternatives.length; i++) {
                const { periodValues, periodAmount } = periodsAlternatives[i];
                const mergedValues = mergeAlternatives(periodValues, periodAmount);

                if (mergedValues.length !== 0 && periodAmount > currentMaxPeriodAmount) {
                    currentPeriodsResult = mergedValues;
                    currentMaxPeriodAmount = periodAmount;
                }
            }

            result.push(...currentPeriodsResult);
        });
    });

    return result;
}
