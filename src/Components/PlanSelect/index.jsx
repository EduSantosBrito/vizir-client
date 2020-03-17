import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';

function PlanSelect({ plans, value, onChange }) {
    return (
        <FormControl variant='filled'>
            <InputLabel id='plan-select'>Selecione o plano</InputLabel>
            <Select labelId='plan-select' value={value} onChange={onChange}>
                <MenuItem value='' disabled>
                    Selecione o plano
                </MenuItem>
                {plans?.map(plan => {
                    return (
                        <MenuItem key={plan._id} value={plan._id}>
                            {plan.name}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}

export default PlanSelect;
