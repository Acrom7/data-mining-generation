import { FC, useState } from 'react';
import { Upload, Button, Form as AntdForm, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Wrapper } from './styles';

export type FormValuesT = {
    values: ValueT[];
    amount: number;
};

type PropsT = {
    onSubmit: (data: FormValuesT) => void;
};

const Form: FC<PropsT> = (props) => {
    const { onSubmit } = props;
    const [values, setValues] = useState<ValueT[]>([]);

    const handleSubmit = (formValues: FormValuesT) => {
        onSubmit({
            values,
            amount: formValues.amount,
        });
    };

    return (
        <Wrapper>
            <AntdForm onFinish={handleSubmit} autoComplete="off">
                <AntdForm.Item
                    name="amount"
                    label="Количество каждого заболевания"
                    rules={[{ required: true }]}
                >
                    <Input />
                </AntdForm.Item>
                <AntdForm.Item
                    name="file"
                    label="Модельная база знаний"
                    valuePropName="file"
                    extra="в формате .json"
                    rules={[{ required: true }]}
                >
                    <Upload
                        accept=".json"
                        maxCount={1}
                        beforeUpload={(file) => {
                            const reader = new FileReader();

                            reader.onload = (event) => {
                                setValues(JSON.parse(event.target?.result as string));
                            };
                            reader.readAsText(file);

                            return false;
                        }}
                    >
                        <Button icon={<UploadOutlined />}>Загрузить</Button>
                    </Upload>
                </AntdForm.Item>
                <AntdForm.Item>
                    <Button type="primary" htmlType="submit">
                        Генерация
                    </Button>
                </AntdForm.Item>
            </AntdForm>
        </Wrapper>
    );
};

export default Form;
