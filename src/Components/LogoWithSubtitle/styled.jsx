import React from 'react';
import styled from 'styled-components';
import { withTheme } from '@material-ui/core';
import { FlexContainer } from '../../Shared';

const LogoContainer = withTheme(styled(({ theme, ...props }) => <FlexContainer {...props} />)`
    width: 12rem;
    ${({ theme }) => theme.breakpoints.up('sm')} {
        width: 15rem;
    }
`);

export default LogoContainer;
