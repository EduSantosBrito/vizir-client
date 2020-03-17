import styled from 'styled-components';
import { withTheme } from '@material-ui/styles';

export const WhiteTitle = withTheme(styled.p`
    font-size: 1.2rem;
    font-weight: 300;
    color: ${({ theme }) => theme.palette.white};
    ${({ theme }) => theme.breakpoints.up('sm')} {
        font-size: 1.5rem;
    }
`);

export const BoldTitle = withTheme(styled.span`
    font-weight: 700;
`);
