import React, { Fragment, useState } from 'react';
import { Input, InputGroup, InputGroupAddon } from 'reactstrap';

const CashComponent = ({ setEnabled, onChange }) => {
    const [name, setName] = useState('');
    const [value, setValue] = useState(0);

    return (
        <Fragment>
            <Input value={ name } onChange={ e => {
                setName(e.target.value);
                setEnabled(!!e.target.value && !!value);
                onChange({
                    name: e.target.value
                });
            } } placeholder='Account Name' style={ { marginTop: 10, marginBottom: 10 } }/>
            <InputGroup style={ { marginTop: 10, marginBottom: 10 } }>
                <InputGroupAddon addonType='prepend'>USD</InputGroupAddon>
                <Input value={ value } onChange={ e => {
                    setValue(e.target.value);
                    setEnabled(!!e.target.value && !!name);
                    onChange({
                        value: {
                            USD: e.target.value
                        }
                    });
                } } placeholder='Value' type='number'/>
            </InputGroup>
        </Fragment>
    );
};

export default CashComponent;
