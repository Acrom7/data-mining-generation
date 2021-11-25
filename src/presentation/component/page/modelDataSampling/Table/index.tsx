import { FC } from 'react';

type PropsT = {
    amount: number;
    values: ValueT[];
};

const Table: FC<PropsT> = (props) => {
    const { amount, values } = props;

    return (
        <>
            {amount} {values.length}
        </>
    );
};

export default Table;
