import React from 'react';
import styled from 'styled-components';
import { withTheme } from '@material-ui/core';
import { FlexContainer } from '../../Shared';

const DrawContainer = withTheme(styled(({ theme, ...props }) => <FlexContainer {...props} />)`
    ${({ theme }) => theme.breakpoints.down('sm')} {
        display: none;
    }
    ${({ theme }) => theme.breakpoints.up('sm')} {
        width: 80%;
    }
`);

export default DrawContainer;
