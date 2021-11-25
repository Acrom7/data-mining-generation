import React, { FC, useState } from 'react';
import Layout from 'presentation/component/layout/Main';
import generateData from './generate/generateData';
import Form from './Form';
import Table from './Table';

const HomePage: FC = () => {
    const [step, setStep] = useState<'form' | 'table'>('form');
    const [data, setData] = useState<GenerateReturnT>({
        classes: [],
        features: [],
        values: [],
        normalValues: [],
        periods: [],
        possibleValues: [],
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleFormSubmit = async (parameters: GenerateParameters) => {
        setIsLoading(true);
        const newData = await generateData(parameters);
        setData(newData);
        setIsLoading(false);
        setStep('table');
    };

    return (
        <Layout>
            {step === 'form' && <Form isLoading={isLoading} onSubmit={handleFormSubmit} />}
            {step === 'table' && <Table data={data} onBackButtonClick={() => setStep('form')} />}
        </Layout>
    );
};

export default HomePage;
