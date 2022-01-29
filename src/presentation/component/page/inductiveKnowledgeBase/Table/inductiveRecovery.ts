import {
    combineByFeature,
    combineByMedicalHistoryNumber,
} from 'presentation/component/page/inductiveKnowledgeBase/Table/combine';


export function recoveryOnePeriod(values: ThirdValueT[]): ValueT[] {
    const groupedByMedicalHistoryNumber = combineByMedicalHistoryNumber(values);
    const groupedByMedicalHistoryNumberAndFeature = groupedByMedicalHistoryNumber.map(({medicalHistoryNumber, values}) => ({
        medicalHistoryNumber,
        values: combineByFeature(values)
    }))

    console.log({ groupedByMedicalHistoryNumber });
    console.log({ groupedByMedicalHistoryNumberAndFeature });
    // Object.entries(groupedByMedicalHistoryNumber).forEach(([classname, thirdValues]) => {
    //     console.log(classname, thirdValues);
    // })

    return [];
}
