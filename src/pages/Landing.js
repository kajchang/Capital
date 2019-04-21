import React, { useState } from 'react';
import { Table, Button, Card, Input, ListGroup, ListGroupItem } from 'reactstrap';
import Layout from '../components/Layout';

import AccountTypes from '../implementations/Account';

const Landing = () => {
    const [displayActive, setDisplayActive] = useState(false);
    const [displayInputActive, setDisplayInputActive] = useState(false);
    const [displayInput, setDisplayInput] = useState('');
    const [displaySubmitEnabled, setDisplaySubmitEnabled] = useState(false);

    const ChosenType = AccountTypes[displayInput];

    return (
        <Layout>
            <Table style={{ marginTop: 25 }}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Value</th>
                    <th>Last Updated</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td colSpan={ 3 }>No Accounts Yet. Add One to Start!</td>
                </tr>
                </tbody>
            </Table>
            <Button onClick={ () => setDisplayActive(!displayActive) }>
                + Add Account
            </Button>
            {
                displayActive ? <Card style={ { width: '50%', padding: 25 } }>
                    <Input value={ displayInput } onChange={ e => setDisplayInput(e.target.value) } onFocus={ () => setDisplayInputActive(true) } placeholder='Account Type'/>
                    {
                        displayInputActive ? <ListGroup style={ { position: 'absolute', zIndex: 1, width: 'calc(100% - 50px)', marginTop: 38 } }>
                            {
                                Object.keys(AccountTypes)
                                    .filter(type => type.toLowerCase().includes(displayInput.toLowerCase()))
                                    .slice(0, 5)
                                    .map((type, idx) =>
                                        <ListGroupItem onClick={ () => {
                                            setDisplayInput(type);
                                            setDisplayInputActive(false);
                                        } } key={ idx } style={ { cursor: 'pointer'} }>{ type }</ListGroupItem>
                                    )
                            }
                        </ListGroup> : null
                    }
                    {
                        typeof ChosenType !== 'undefined' ? <ChosenType.Component setEnabled={ setDisplaySubmitEnabled }/> : null
                    }
                    <Button disabled={ !displaySubmitEnabled } style={ { width: '25%', marginTop: 5 } }>Create</Button>
                </Card> : null
            }
        </Layout>
    );
};

export default Landing;
