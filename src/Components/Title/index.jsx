import React from 'react';
import { FlexContainer, GridArea } from '../../Shared';
import { WhiteTitle, BoldTitle } from './styled';

function Title() {
    return (
        <GridArea gridArea='title'>
            <FlexContainer>
                <WhiteTitle>
                    Os <BoldTitle>melhores</BoldTitle> planos telefônicos
                </WhiteTitle>
            </FlexContainer>
        </GridArea>
    );
}

export default Title;
