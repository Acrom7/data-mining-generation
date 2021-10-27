export type TableVariantT = 'class' | 'feature' | 'possible' | 'normal' | 'clinical' | 'period' | 'value' | 'border'

export function getColumns(variant: TableVariantT) {
    if (variant === 'value') {
        return [
            {
                title: 'Класс',
                dataIndex: 'class',
            },
            {
                title: 'Признак',
                dataIndex: 'feature',
            },
            {
                title: 'Число периодов динамики',
                dataIndex: 'periodAmount',
            },
            {
                title: '№ периода',
                dataIndex: 'period',
            },
            {
                title: 'ЗДП',
                dataIndex: 'value',
            },
        ];
    }

    if (variant === 'class') {
        return [
            {
                title: 'Классы',
            },
        ];
    }

    if (variant === 'feature') {
        return [
            {
                title: 'Признаки',
            },
        ];
    }
}

export function getData(variant: TableVariantT, data: GenerateReturnT) {
    const { classes, features, values } = data;

    const mapVariantToData: Record<TableVariantT, Array<unknown>> = {
        class: classes,
        feature: features,
        value: values
    }

    return mapVariantToData[variant]
}
