import { TextField, Typography } from '@material-ui/core';
import React, { useCallback, useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Button, CardBodyFormContainer, WhiteCardBody, PurpleResult, ButtonContainer } from './styled';
import PlanSelect from '../PlanSelect';
import Loading from '../Loading';
import { FlexContainer } from '../../Shared';

const GET_PLANS_QUERY = gql`
    query {
        getPlans {
            _id
            name
            freeMinutes
        }
    }
`;

const GET_PLAN_BY_ID_QUERY = gql`
    query getPlanById($_id: Int) {
        getPlanById(_id: $_id) {
            _id
            name
            freeMinutes
        }
    }
`;

const GET_PRICE_BY_ORIGIN_AND_DESTINY_QUERY = gql`
    query getPriceByOriginAndDestiny($origin: String, $destiny: String) {
        getPriceByOriginAndDestiny(origin: $origin, destiny: $destiny) {
            _id
            origin
            destiny
            pricePerMinute
        }
    }
`;

function CardBody() {
    const { called, loading, data } = useQuery(GET_PLANS_QUERY);
    const [getPlanById, getPlanByIdResult] = useLazyQuery(GET_PLAN_BY_ID_QUERY);
    const [getPriceByOriginAndDestiny, getPriceByOriginAndDestinyResult] = useLazyQuery(GET_PRICE_BY_ORIGIN_AND_DESTINY_QUERY);
    const [plan, setPlan] = useState('');
    const [origin, setOrigin] = useState('');
    const [destiny, setDestiny] = useState('');
    const [timeSpent, setTimeSpent] = useState('');
    const [finalPriceWithPlan, setFinalPriceWithPlan] = useState(null);
    const [finalPriceWithoutPlan, setFinalPriceWithoutPlan] = useState(null);

    const handleOriginChange = useCallback(event => {
        setOrigin(event.target.value);
        setFinalPriceWithPlan(null);
        setFinalPriceWithoutPlan(null);
    }, []);

    const handleDestinyChange = useCallback(event => {
        setDestiny(event.target.value);
        setFinalPriceWithPlan(null);
        setFinalPriceWithoutPlan(null);
    }, []);

    const handlePlanChange = useCallback(event => {
        setPlan(event.target.value);
        setFinalPriceWithPlan(null);
        setFinalPriceWithoutPlan(null);
    }, []);

    const handleTimeSpentChange = useCallback(event => {
        const { value } = event.target;
        if (!Number.isNaN(Number(value))) {
            setTimeSpent(event.target.value);
            setFinalPriceWithPlan(null);
            setFinalPriceWithoutPlan(null);
        }
    }, []);

    const calculateFinalPrice = useCallback(() => {
        if (plan) {
            getPlanById({ variables: { _id: Number(plan) } });
        }

        if (origin && destiny) {
            getPriceByOriginAndDestiny({ variables: { origin, destiny } });
        }
    }, [destiny, getPlanById, getPriceByOriginAndDestiny, origin, plan]);

    useEffect(() => {
        const selectedPlan = getPlanByIdResult?.data?.getPlanById;
        const price = getPriceByOriginAndDestinyResult?.data?.getPriceByOriginAndDestiny;
        if (selectedPlan && price) {
            const priceWithPlan = price?.pricePerMinute * (timeSpent - selectedPlan?.freeMinutes);
            if (!Number.isNaN(priceWithPlan) && priceWithPlan >= 0) {
                setFinalPriceWithPlan(priceWithPlan);
            } else {
                setFinalPriceWithPlan('0');
            }
            const priceWithoutPlan = price?.pricePerMinute * timeSpent;
            if (!Number.isNaN(priceWithoutPlan) && priceWithoutPlan >= 0) {
                setFinalPriceWithoutPlan(priceWithoutPlan);
            } else {
                setFinalPriceWithoutPlan('0');
            }
        }
    }, [getPlanByIdResult, getPriceByOriginAndDestinyResult, timeSpent]);

    if (
        (called && loading) ||
        (getPlanByIdResult.called && getPlanByIdResult.loading) ||
        (getPriceByOriginAndDestinyResult.called && getPriceByOriginAndDestinyResult.loading)
    ) {
        return <Loading />;
    }

    return (
        <WhiteCardBody>
            <CardBodyFormContainer>
                <TextField value={origin} onChange={handleOriginChange} label='Origem' variant='filled' />
                <TextField value={destiny} onChange={handleDestinyChange} label='Destino' variant='filled' />
                <PlanSelect plans={data?.getPlans} value={plan} onChange={handlePlanChange} label='Selecione o plano' variant='filled' />
                <TextField value={timeSpent} onChange={handleTimeSpentChange} label='Tempo gasto' variant='filled' />
                <FlexContainer flexDirection='column' alignItems='flex-start'>
                    {finalPriceWithoutPlan && (
                        <Typography>
                            {`Sem FaleMais ${Number(finalPriceWithoutPlan).toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                                style: 'currency',
                                currency: 'BRL',
                            })}`}
                        </Typography>
                    )}
                    {finalPriceWithPlan && (
                        <PurpleResult>
                            {`Com FaleMais ${Number(finalPriceWithPlan).toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                                style: 'currency',
                                currency: 'BRL',
                            })}`}
                        </PurpleResult>
                    )}
                </FlexContainer>
                <ButtonContainer>
                    <Button onClick={() => calculateFinalPrice()}>Calcular</Button>
                </ButtonContainer>
            </CardBodyFormContainer>
        </WhiteCardBody>
    );
}

export default CardBody;
