import { FC, useState } from 'react';
import { Upload, Button, Form as AntdForm } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Wrapper } from './styles';

export type FormValuesT = {
    modelValues: ValueT[];
    inductiveValues: ValueT[];
};

type PropsT = {
    onSubmit: (data: FormValuesT) => void;
};

const Form: FC<PropsT> = (props) => {
    const { onSubmit } = props;
    const [modelValues, setModelValues] = useState<ValueT[]>([]);
    const [inductiveValues, setInductiveValues] = useState<ValueT[]>([]);

    const handleSubmit = () => {
        onSubmit({
            modelValues,
            inductiveValues,
        });
    };

    return (
        <Wrapper>
            <AntdForm onFinish={handleSubmit} autoComplete="off">
                <AntdForm.Item
                    name="model"
                    label="Модельная база знаний"
                    valuePropName="file"
                    extra="GeneratedModel.json"
                    rules={[{ required: true }]}
                >
                    <Upload
                        accept=".json"
                        maxCount={1}
                        beforeUpload={(file) => {
                            const reader = new FileReader();

                            reader.onload = (event) => {
                                setModelValues(JSON.parse(event.target?.result as string));
                            };
                            reader.readAsText(file);

                            return false;
                        }}
                    >
                        <Button icon={<UploadOutlined />}>Загрузить</Button>
                    </Upload>
                </AntdForm.Item>
                <AntdForm.Item
                    name="inductiveModel"
                    label="Индуктивно сформированная база знаний"
                    valuePropName="file"
                    extra="InductiveKnowledgeBase.json"
                    rules={[{ required: true }]}
                >
                    <Upload
                        accept=".json"
                        maxCount={1}
                        beforeUpload={(file) => {
                            const reader = new FileReader();

                            reader.onload = (event) => {
                                setInductiveValues(JSON.parse(event.target?.result as string));
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
                        Сравнить
                    </Button>
                </AntdForm.Item>
            </AntdForm>
        </Wrapper>
    );
};

export default Form;
