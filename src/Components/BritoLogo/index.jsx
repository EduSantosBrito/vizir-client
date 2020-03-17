import React from 'react';
import { GridArea } from '../../Shared';
import BritoLogoContainer from './styled';

function BritoLogo() {
    return (
        <GridArea gridArea='britoLogo'>
            <BritoLogoContainer>
                <img width='100%' src='/britoLogo.svg' alt='Logo escrito brito.top' />
            </BritoLogoContainer>
        </GridArea>
    );
}

export default BritoLogo;
