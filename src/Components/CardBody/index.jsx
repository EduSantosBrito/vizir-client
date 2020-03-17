import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { TextField, Typography } from '@material-ui/core';
import { gql } from 'apollo-boost';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNotify } from '../../Context/NotifyProvider';
import { FlexContainer } from '../../Shared';
import Loading from '../Loading';
import PlanSelect from '../PlanSelect';
import { Button, ButtonContainer, CardBodyFormContainer, PurpleResult, WhiteCardBody } from './styled';

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
    const { called, loading, data } = useQuery(GET_PLANS_QUERY, { errorPolicy: 'all' });
    const [getPlanById, getPlanByIdResult] = useLazyQuery(GET_PLAN_BY_ID_QUERY, { errorPolicy: 'all' });
    const [getPriceByOriginAndDestiny, getPriceByOriginAndDestinyResult] = useLazyQuery(GET_PRICE_BY_ORIGIN_AND_DESTINY_QUERY, {
        errorPolicy: 'all',
    });
    const [plan, setPlan] = useState('');
    const [origin, setOrigin] = useState('');
    const [destiny, setDestiny] = useState('');
    const [timeSpent, setTimeSpent] = useState('');
    const [finalPriceWithPlan, setFinalPriceWithPlan] = useState(null);
    const [finalPriceWithoutPlan, setFinalPriceWithoutPlan] = useState(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const { showError } = useNotify();

    const isLoading = useMemo(
        () =>
            (called && loading) ||
            (getPlanByIdResult.called && getPlanByIdResult.loading) ||
            (getPriceByOriginAndDestinyResult.called && getPriceByOriginAndDestinyResult.loading),
        [
            called,
            getPlanByIdResult.called,
            getPlanByIdResult.loading,
            getPriceByOriginAndDestinyResult.called,
            getPriceByOriginAndDestinyResult.loading,
            loading,
        ],
    );

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
        setIsCalculating(true);
        if (plan) {
            getPlanById({ variables: { _id: Number(plan) } });
        } else {
            showError('Selecione um plano');
        }

        if (origin && destiny) {
            getPriceByOriginAndDestiny({ variables: { origin, destiny } });
        } else {
            showError('Digite uma origem e destino');
        }
    }, [destiny, getPlanById, getPriceByOriginAndDestiny, origin, plan, showError]);

    useEffect(() => {
        const selectedPlan = getPlanByIdResult?.data?.getPlanById;
        const price = getPriceByOriginAndDestinyResult?.data?.getPriceByOriginAndDestiny;
        if (!isLoading) {
            if (timeSpent && isCalculating) {
                const priceWithPlan = price?.pricePerMinute * (timeSpent - selectedPlan?.freeMinutes);
                if (!Number.isNaN(priceWithPlan) && priceWithPlan >= 0) {
                    setFinalPriceWithPlan(priceWithPlan + priceWithPlan * 0.1);
                } else {
                    setFinalPriceWithPlan('0');
                }
                const priceWithoutPlan = price?.pricePerMinute * timeSpent;
                if (!Number.isNaN(priceWithoutPlan) && priceWithoutPlan >= 0) {
                    setFinalPriceWithoutPlan(priceWithoutPlan);
                } else {
                    setFinalPriceWithoutPlan('0');
                }
                setIsCalculating(false);
            } else if (isCalculating) {
                showError('Digite o tempo gasto');
            }
        }
    }, [getPlanByIdResult, getPriceByOriginAndDestinyResult, isCalculating, isLoading, showError, timeSpent]);

    useEffect(() => {
        if (getPriceByOriginAndDestinyResult?.error?.graphQLErrors?.length) {
            showError(getPriceByOriginAndDestinyResult.error.graphQLErrors[0].message);
        }
    }, [getPriceByOriginAndDestinyResult, showError]);

    useEffect(() => {
        if (getPlanByIdResult?.error?.graphQLErrors?.length) {
            showError(getPlanByIdResult.error.graphQLErrors[0].message);
        }
    }, [getPlanByIdResult, showError]);

    if (isLoading) {
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
