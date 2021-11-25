import { FC, useState } from 'react';
import Layout from 'presentation/component/layout/Main';
import Form, { FormValuesT } from './Form';
import Table from './Table';

type DataSamplingStepT = 'form' | 'table';

const ModelDataSampling: FC = () => {
    const [step, setStep] = useState<DataSamplingStepT>('form');
    const [values, setValues] = useState<ValueT[]>([]);
    const [amount, setAmount] = useState(0);

    const handleFormSubmit = (formValuesT: FormValuesT) => {
        setAmount(formValuesT.amount);
        setValues(formValuesT.values);
        setStep('table');
    };

    return (
        <Layout>
            {step === 'form' && <Form onSubmit={handleFormSubmit} />}
            {step === 'table' && <Table amount={amount} values={values} />}
        </Layout>
    );
};

export default ModelDataSampling;
