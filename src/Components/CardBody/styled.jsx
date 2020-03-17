import React from 'react';
import { withTheme } from '@material-ui/styles';
import styled from 'styled-components';
import { Button as MuiButton, Typography } from '@material-ui/core';
import { FlexContainer, GridContainer } from '../../Shared';

export const WhiteCardBody = withTheme(styled(({ theme, ...props }) => <FlexContainer {...props} />)`
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    width: 90%;
    min-height: 400px;
    max-width: 500px;
    height: 100%;
    background-color: ${({ theme }) => theme.palette.white};
    ${({ theme }) => theme.breakpoints.up('sm')} {
        align-items: flex-start;
    }
`);

export const ButtonContainer = withTheme(styled(({ theme, ...props }) => <FlexContainer {...props} />)`
    ${({ theme }) => theme.breakpoints.up('sm')} {
        grid-column: 1/3;
    }
`);

export const CardBodyFormContainer = withTheme(styled(({ theme, ...props }) => <GridContainer {...props} />)`
    margin: ${({ theme }) => `${theme.spacing(4, 2)}`};
    width: 100%;
    grid-template-columns: 1fr;
    grid-row-gap: ${({ theme }) => `${theme.spacing(2)}px`};
    && {
        label.Mui-focused {
            color: ${({ theme }) => theme.palette.purple};
        }
        .MuiFilledInput-underline:after {
            border-bottom-color: ${({ theme }) => theme.palette.purple};
        }
    }
    ${({ theme }) => theme.breakpoints.up('sm')} {
        grid-template-columns: 1fr 1fr;
        grid-column-gap: ${({ theme }) => `${theme.spacing(3)}px`};
    }
`);

export const Button = withTheme(styled(({ theme, ...props }) => <MuiButton {...props} />)`
    && {
        padding: 15px 25px;
        min-width: 250px;
        text-transform: uppercase;
        color: ${({ theme }) => theme.palette.white};
        background-color: ${({ theme }) => theme.palette.purple};
        :hover {
            background-color: ${({ theme }) => theme.palette.darkPurple};
        }
    }
`);

export const PurpleResult = withTheme(styled(({ theme, ...props }) => <Typography {...props} />)`
    && {
        color: ${({ theme }) => theme.palette.purple};
        font-weight: 700;
    }
`);
