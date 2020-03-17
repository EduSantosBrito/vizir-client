import React from 'react';
import { WhiteContainer, PurpleCircularProgress } from './styled';

function Loading() {
    return (
        <WhiteContainer>
            <PurpleCircularProgress />
        </WhiteContainer>
    );
}

export default Loading;
