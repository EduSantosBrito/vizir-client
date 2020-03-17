import { withTheme } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { GridContainer } from '../../Shared';

const MainContainer = withTheme(styled(({ theme, ...props }) => <GridContainer {...props} />)`
    height: 100%;
    grid-row-gap: ${({ theme }) => `${theme.spacing(4)}px`};
    grid-template-areas:
        'logoWithSubtitle'
        'title'
        'card'
        'britoLogo';
    grid-template-rows: 2fr 1fr 4fr 1fr;
    ${({ theme }) => theme.breakpoints.up('md')} {
        padding: ${({ theme }) => theme.spacing(4, 8)};
        height: calc(100% - ${({ theme }) => `${theme.spacing(4) * 2}px`});
        grid-template-areas:
            '. logoWithSubtitle'
            '. title'
            'card draw'
            'britoLogo britoLogo';
        grid-template-columns: 1fr 1fr;
        grid-template-rows: fit-content(200px) fit-content(200px) 1fr fit-content(200px);
        grid-row-gap: 0px;
        grid-column-gap: ${({ theme }) => `${theme.spacing(5)}px`};
    }
`);

export default MainContainer;
