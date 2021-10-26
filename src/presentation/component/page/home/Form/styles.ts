import styled from '@emotion/styled';
import { Form as AntdForm } from 'antd'

export const Wrapper = styled.div`
    display: flex;
    height: 100vh;
    width: 400px;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
`;

export const Form = styled(AntdForm)`
    width: 100%;
`

export const Item = styled(AntdForm.Item)`
    width: 100%;
`
