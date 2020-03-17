import { CircularProgress, withTheme } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { FlexContainer } from '../../Shared';

export const WhiteContainer = withTheme(styled(({ theme, ...props }) => <FlexContainer {...props} />)`
    width: 90%;
    max-width: 500px;
    min-height: 400px;
    height: 100%;
    background-color: ${({ theme }) => theme.palette.white};
`);

export const PurpleCircularProgress = withTheme(styled(({ theme, ...props }) => <CircularProgress {...props} />)`
    && {
        color: ${({ theme }) => theme.palette.purple};
    }
`);
