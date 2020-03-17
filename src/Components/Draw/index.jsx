import React from 'react';
import { GridArea } from '../../Shared';
import BritoLogoContainer from './styled';

function Draw() {
    return (
        <GridArea gridArea='draw'>
            <BritoLogoContainer>
                <img width='100%' src='/draw.svg' alt='Desenho de uma pessoa e um celular fazendo ligação de fundo.' />
            </BritoLogoContainer>
        </GridArea>
    );
}

export default Draw;
