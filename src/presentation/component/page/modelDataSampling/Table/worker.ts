import generateDataSampling from './generateDataSampling';

type WorkerPropsT = {
    data: {
        amount: number;
        values: ValueT[];
    };
};

// eslint-disable-next-line no-restricted-globals
const context = (self as unknown) as Worker;

context.onmessage = ({ data }: WorkerPropsT) => {
    const { amount, values } = data;
    const result = generateDataSampling(amount, values);
    const CHUNK_SIZE = 2_000_000;

    for (let i = 0, j = CHUNK_SIZE; i < result.length; i += CHUNK_SIZE, j += CHUNK_SIZE) {
        context.postMessage({
            result: result.slice(i, j),
        });
    }
};
