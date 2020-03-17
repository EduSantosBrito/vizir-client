import React from 'react';
import { withTheme } from '@material-ui/styles';
import styled from 'styled-components';
import { FlexContainer } from '../../Shared';

export const PurpleCardHeader = withTheme(styled(({ theme, ...props }) => <FlexContainer {...props} />)`
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    width: 90%;
    max-width: 500px;
    background-color: ${({ theme }) => theme.palette.purple};
`);

export const BoldCardTitle = withTheme(styled.p`
    font-size: 1.2rem;
    color: ${({ theme }) => theme.palette.white};
    font-weight: 700;
    text-transform: uppercase;
`);
