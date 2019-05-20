import React, { Fragment, useState } from 'react';
import { Input, InputGroup, InputGroupAddon } from 'reactstrap';

import { connect } from 'react-redux';

const ValueComponent = ({ setEnabled, onChange, currencies }) => {
    const [name, setName] = useState('');
    const [value, setValue] = useState(0);
    const [currency, setCurrency] = useState('USD');

    return (
        <Fragment>
            <Input value={ name } onChange={ e => {
                setName(e.target.value);
                setEnabled(!!e.target.value && !!value);
                onChange({
                    name: e.target.value
                });
            } } placeholder='Name' style={ { marginTop: 10, marginBottom: 10 } }/>
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
                    setEnabled(!!e.target.value && !!name);
                    onChange({
                        values: {
                            [currency]: Number(e.target.value)
                        }
                    });
                } } placeholder='Value' type='number'/>
            </InputGroup>
        </Fragment>
    );
};

const mapStateToProps = state => ({
    currencies: state.currencies.data
});

export default connect(mapStateToProps)(ValueComponent);
