import { useTheme } from '@material-ui/styles';
import React from 'react';
import { GridArea } from '../../Shared';
import LogoContainer from './styled';

function LogoWithSubtitle() {
    const theme = useTheme();

    return (
        <GridArea margin={theme.spacing(4, 0, 0, 0)} gridArea='logoWithSubtitle'>
            <LogoContainer>
                <img width='100%' src='/logoWithSubtitle.svg' alt='Logo do FaleMais com um subtítulo escrito: por menos' />
            </LogoContainer>
        </GridArea>
    );
}

export default LogoWithSubtitle;
