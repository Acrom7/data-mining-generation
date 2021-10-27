import { TableColumnsType } from 'antd';
import intervalToString from 'helper/interval/intervalToString';

export type TableVariantT = 'class' | 'feature' | 'possible' | 'period' | 'value' | 'border'

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
            {
                title: 'НГ',
                dataIndex: 'bottomBorder',
            },
            {
                title: 'ВГ',
                dataIndex: 'topBorder',
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

    if (variant === 'period') {
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
                title: 'ЧПД',
                dataIndex: 'periodAmount',
            },
        ];
    }

    if (variant === 'possible') {
        return [
            {
                title: 'Признак',
                dataIndex: 'feature',
            },
            {
                title: 'Возможные значения',
                dataIndex: 'possible',
            },
            {
                title: 'Нормальные значения',
                dataIndex: 'normal',
            },
        ];
    }
}

export function getData(variant: TableVariantT, data: GenerateReturnT) {
    const { classes, features, values, possibleValues, normalValues, periods } = data;

    const mapVariantToData: Record<TableVariantT, Array<unknown>> = {
        class: classes,
        feature: features,
        value: values,
        possible: Object.entries(possibleValues).map(([key, value]) => ({
            feature: key,
            possible: intervalToString(value),
            normal: intervalToString(normalValues[Number(key)]),
        })),
        period: periods,
    };

    return mapVariantToData[variant];
}
