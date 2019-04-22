import React, { useState } from 'react';
import { Table, Button, Card, Input, ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';

import { createAccount } from '../redux/actions';
import AccountRegistry from '../utils/AccountRegistry';
import convert from '../utils/CurrencyConverter';
import _ from 'lodash-es';

const Accounts = ({ accounts, currencies, createAccount }) => {
    const [displayActive, setDisplayActive] = useState(false);
    const [displayInputActive, setDisplayInputActive] = useState(false);
    const [displayInput, setDisplayInput] = useState('');
    const [displaySubmitEnabled, setDisplaySubmitEnabled] = useState(false);
    const [displayState, setDisplayState] = useState({});

    const ChosenType = AccountRegistry.getAccountType(displayInput);

    return (
        <div style={ { margin: 25 } }>
            <Table style={ { marginTop: 25 } }>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Value</th>
                    <th>Last Updated</th>
                    <th>Created</th>
                </tr>
                </thead>
                <tbody>
                {
                    accounts.length > 0 ? accounts.map((account, idx) => <tr key={ idx }>
                        <td>{ account.name }</td>
                        <td>{ account.constructor.name }</td>
                        <td>{
                            _.isEqual(Object.keys(account.value), ['USD']) ?
                                <span>{ convert(currencies, account.value).toFixed(2) } USD</span> :
                                <i>{ convert(currencies, account.value).toFixed(2) } USD</i>
                        }</td>
                        <td>{ account.lastUpdated.format('MMM Do, YYYY') }</td>
                        <td>{ account.created.format('MMM Do, YYYY') }</td>
                    </tr>) : <tr>
                        <td colSpan={ 3 }>No Accounts Yet. Add One to Start!</td>
                    </tr>
                }
                </tbody>
            </Table>
            <p style={ { fontSize: 10 } }><i>* Italics signal currency conversion</i></p>
            <Button onClick={ () => setDisplayActive(!displayActive) }>
                + Add Account
            </Button>
            {
                displayActive ? <Card style={ { width: '50%', padding: 25 } }>
                    <Input value={ displayInput } onChange={ e => setDisplayInput(e.target.value) } onFocus={ () => setDisplayInputActive(true) } placeholder='Account Type'/>
                    {
                        displayInputActive ? <ListGroup style={ { position: 'absolute', zIndex: 1, width: 'calc(100% - 50px)', marginTop: 38 } }>
                            {
                                Object.keys(AccountRegistry.getAccountTypes())
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
                    <form onSubmit={ e => {
                        e.preventDefault();
                        createAccount(new ChosenType(displayState));
                        setDisplayActive(false);
                        setDisplayInput('');
                        setDisplaySubmitEnabled(false);
                        setDisplayState({});
                    } }>
                        {
                            typeof ChosenType !== 'undefined' ? <ChosenType.Component
                                setEnabled={ setDisplaySubmitEnabled }
                                onChange={ state => setDisplayState(Object.assign(displayState, state)) }
                            /> : null
                        }
                        <Button disabled={ !displaySubmitEnabled } type='submit' style={ { width: '25%', marginTop: 5 } }>Create</Button>
                    </form>
                </Card> : null
            }
        </div>
    );
};

const mapStateToProps = state => ({
    accounts: state.accounts.data,
    currencies: state.currencies.data
});

const mapDispatchToProps = dispatch => ({
    createAccount: account => dispatch(createAccount(account)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
