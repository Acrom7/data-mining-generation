import React, { FC } from 'react';
import { Global } from '@emotion/react';
import globalCss from 'presentation/component/layout/common/globalCss';
import { Main } from './styles';

const Layout: FC = (props) => {
    const { children } = props;

    return (
        <>
            <Main>{children}</Main>
            <Global styles={globalCss} />
        </>
    );
};

export default Layout;
