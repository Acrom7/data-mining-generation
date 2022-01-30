import { FC } from 'react';
import { InputNumber, Button } from 'antd';
import { Wrapper, Form as BaseForm, Item } from './styles';

type PropsT = {
    isLoading: boolean;
    onSubmit: (data: GenerateParameters) => void;
};

const validateMessages = {
    required: '${label} обязательно к заполнению!',
    types: {
        number: '${label} должно быть числом!',
    },
    number: {
        range: '${label} должно быть между ${min} и ${max}',
    },
};

const Form: FC<PropsT> = (props) => {
    const { isLoading, onSubmit } = props;

    return (
        <Wrapper>
            <BaseForm
                name="generate"
                layout="vertical"
                validateMessages={validateMessages}
                initialValues={{
                    classAmount: 99,
                    featureAmount: 999,
                    periodAmount: 5,
                }}
                onFinish={(data) => {
                    onSubmit(data as GenerateParameters);
                }}
                autoComplete="off"
            >
                <Item label="Количество классов" name="classAmount" rules={[
                    { required: true },
                    { type: 'number', min: 1, max: 99 },
                ]}>
                    <InputNumber />
                </Item>
                <Item
                    label="Количество признаков"
                    name="featureAmount"
                    rules={[
                        { required: true },
                        { type: 'number', min: 1, max: 999 },
                    ]}
                >
                    <InputNumber />
                </Item>
                <Item
                    label="Максимальное количество периодов динамики"
                    name="periodAmount"
                    rules={[
                        { required: true },
                        { type: 'number', min: 1, max: 5 },
                    ]}
                >
                    <InputNumber />
                </Item>
                <Item>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Сгенерировать
                    </Button>
                </Item>
            </BaseForm>
        </Wrapper>
    );
};

export default Form;
