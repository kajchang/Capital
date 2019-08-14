import React, { useState } from 'react';
import { Input, InputGroup, InputGroupAddon } from 'reactstrap';

import { connect } from 'react-redux';

import { store } from '../';
import { createTransaction } from '../redux/actions';
import TransactionModel from '../models/TransactionModel';

const ValueComponent = ({ createTransaction, useOnSubmit, setEnabled, onChange, currencies, min = 0 }) => {
    const [value, setValue] = useState(0);
    const [currency, setCurrency] = useState('USD');
    useOnSubmit(ctx => createTransaction(new TransactionModel({
        ...ctx,
        name: 'Initial Amount'
    })));

    return (
        <InputGroup style={ { marginTop: 10, marginBottom: 10 } }>
            <InputGroupAddon addonType='prepend'>
                <select value={ currency } onChange={ e => {
                    setCurrency(e.target.value);
                    onChange({
                        values: {
                            [e.target.value]: value
                        }
                    });
                } }>
                    {
                        Object.keys(currencies).map((currency, idx) => <option key={ idx } name={ currency }>
                            { currency }
                        </option>)
                    }
                </select>
            </InputGroupAddon>
            <Input value={ value } onChange={ e => {
                setValue(e.target.value);
                setEnabled(parseFloat(e.target.value) >= min && parseFloat(e.target.value) !== 0);
                onChange({
                    values: {
                        [currency]: Number(e.target.value)
                    }
                });
            } } placeholder='Value' type='number'/>
        </InputGroup>
    );
};

const mapStateToProps = state => ({
    currencies: state.currencies.data
});

const mapDispatchToProps = dispatch => ({
   createTransaction: transaction => dispatch(createTransaction(transaction))
});

export default connect(mapStateToProps, mapDispatchToProps)(ValueComponent);
