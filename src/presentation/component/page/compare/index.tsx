import { FC, useState } from 'react';
import Layout from 'presentation/component/layout/Main';
import Form, { FormValuesT } from './Form';
import Table from './Table';

type DataSamplingStepT = 'form' | 'table';

const InductiveKnowledgeBase: FC = () => {
    const [step, setStep] = useState<DataSamplingStepT>('form');
    const [currentModelValues, setCurrentModelValues] = useState<ValueT[]>([]);
    const [currentInductiveValues, setCurrentInductiveValues] = useState<ValueT[]>([]);

    const handleFormSubmit = ({ modelValues, inductiveValues }: FormValuesT) => {
        setCurrentInductiveValues(inductiveValues);
        setCurrentModelValues(modelValues);
        setStep('table');
    };

    return (
        <Layout>
            {step === 'form' && <Form onSubmit={handleFormSubmit} />}
            {step === 'table' && (
                <Table modelValues={currentModelValues} inductiveValues={currentInductiveValues} />
            )}
        </Layout>
    );
};

export default InductiveKnowledgeBase;
