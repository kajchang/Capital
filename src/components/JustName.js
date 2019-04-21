import React, { Fragment, useState } from 'react';
import { Input } from 'reactstrap';

const JustName = ({ setEnabled, onChange }) => {
    const [name, setName] = useState('');

    return (
        <Fragment>
            <Input value={ name } onChange={ e => {
                setName(e.target.value);
                setEnabled(!!e.target.value);
                onChange({
                    name: e.target.value
                });
            } } placeholder='Account Name' style={ { marginTop: 10, marginBottom: 10 } }/>
        </Fragment>
    );
};

export default JustName;
