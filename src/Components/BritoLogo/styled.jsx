import React from 'react';
import styled from 'styled-components';
import { withTheme } from '@material-ui/core';
import { FlexContainer } from '../../Shared';

const BritoLogoContainer = withTheme(styled(({ theme, ...props }) => <FlexContainer {...props} />)`
    width: 5rem;
    ${({ theme }) => theme.breakpoints.up('sm')} {
        width: 6rem;
    }
`);

export default BritoLogoContainer;
