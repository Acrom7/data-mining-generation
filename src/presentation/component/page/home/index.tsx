import { FC } from 'react';
import NextLink from 'next/link';
import { Button } from 'antd';
import { MODEL_KNOWLEDGE_BASE, MODEL_DATA_SAMPLING } from 'constant/routes';
import Layout from 'presentation/component/layout/Main';
import { Inner, Wrapper } from './styles';

const Home: FC = () => {
    return (
        <Layout>
            <Wrapper>
                <Inner>
                    <NextLink href={MODEL_KNOWLEDGE_BASE} passHref>
                        <Button>Генерация модельной базы знаний</Button>
                    </NextLink>
                    <NextLink href={MODEL_DATA_SAMPLING} passHref>
                        <Button>Генерация модельной выборки данных</Button>
                    </NextLink>
                </Inner>
            </Wrapper>
        </Layout>
    );
};

export default Home;
