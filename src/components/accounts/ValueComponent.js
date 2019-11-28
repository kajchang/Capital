import React, { useState } from 'react';
import { Input, InputGroup, InputGroupAddon } from 'reactstrap';

import { connect } from 'react-redux';

import { createTransaction } from '../../redux/actions';
import TransactionModel from '../../models/TransactionModel';

const ValueComponent = ({ createTransaction, useOnSubmit, setEnabled, currencies, min = 0 }) => {
    const [value, setValue] = useState(0);
    const [currency, setCurrency] = useState('USD');
    useOnSubmit(ctx => createTransaction(new TransactionModel({
        values: {
            [currency]: value
        },
        name: 'Initial Amount',
        ...ctx
    })));

    return (
        <InputGroup style={ { marginTop: 10, marginBottom: 10 } }>
            <InputGroupAddon addonType='prepend'>
                <select value={ currency } onChange={ e => {
                    setCurrency(e.target.value);
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
