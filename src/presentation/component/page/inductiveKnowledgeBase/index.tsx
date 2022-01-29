import { FC, useState } from 'react';
import Layout from 'presentation/component/layout/Main';
import Form from './Form';
import Table from './Table';

type DataSamplingStepT = 'form' | 'table';

const InductiveKnowledgeBase: FC = () => {
    const [step, setStep] = useState<DataSamplingStepT>('form');
    const [values, setValues] = useState<ThirdValueT[]>([]);

    const handleFormSubmit = ({values: v}: {values: ThirdValueT[]}) => {
        setValues(v)
        setStep('table');
    };

    return (
        <Layout>
            {step === 'form' && <Form onSubmit={handleFormSubmit} />}
            {step === 'table' && <Table values={values} />}
        </Layout>
    );
};

export default InductiveKnowledgeBase;
