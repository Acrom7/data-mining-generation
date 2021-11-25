import { TableColumnType } from 'antd';
import intervalToString from 'helper/interval/intervalToString';

export type TableVariantT = 'class' | 'feature' | 'possible' | 'period' | 'value';

// eslint-disable-next-line @typescript-eslint/ban-types
export function getColumns(variant: TableVariantT): TableColumnType<object>[] {
    if (variant === 'value') {
        return [
            {
                title: 'Класс',
                dataIndex: 'class',
                render: (value) => `Заболевание${value}`,
            },
            {
                title: 'Признак',
                dataIndex: 'feature',
                render: (value) => `Признак${value}`,
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
                render: (value) => intervalToString(value),
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
                render: (value) => `Заболевание${value}`,
            },
        ];
    }

    if (variant === 'feature') {
        return [
            {
                title: 'Признаки',
                render: (value) => `Признак${value}`,
            },
        ];
    }

    if (variant === 'period') {
        return [
            {
                title: 'Класс',
                dataIndex: 'class',
                render: (value) => `Заболевание${value}`,
            },
            {
                title: 'Признак',
                dataIndex: 'feature',
                render: (value) => `Признак${value}`,
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
                render: (value) => `Признак${value}`,
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

    return [];
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
