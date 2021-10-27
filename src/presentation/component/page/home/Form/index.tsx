import { FC } from 'react';
import { Input, Button } from 'antd';
import { Wrapper, Form as BaseForm, Item } from './styles';

type PropsT = {
    isLoading: boolean;
    onSubmit: (data: GenerateParameters) => void
}

const Form: FC<PropsT> = (props) => {
    const { isLoading, onSubmit } = props;

    return (
        <Wrapper>
            <BaseForm
                name="generate"
                layout="vertical"
                validateMessages={{
                    required: 'Это поле обязательно к заполнению',
                }}
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
                <Item
                    label="Количество классов"
                    name="classAmount"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Item>
                <Item
                    label="Количество признаков"
                    name="featureAmount"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Item>
                <Item
                    label="Максимальное количество периодов динамики"
                    name="periodAmount"
                    rules={[{ required: true }]}
                >
                    <Input />
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
