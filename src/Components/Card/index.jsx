import React from 'react';
import { FlexContainer, GridArea, GridContainer } from '../../Shared';
import CardBody from '../CardBody';
import CardHeader from '../CardHeader';

function Card() {
    return (
        <GridArea width='100%' gridArea='card'>
            <GridContainer width='100%'>
                <FlexContainer flexDirection='column'>
                    <CardHeader />
                    <CardBody />
                </FlexContainer>
            </GridContainer>
        </GridArea>
    );
}

export default Card;
