import React, { createElement, useState } from 'react';
import { Button, Card, Input, ListGroup, ListGroupItem } from 'reactstrap';
import SortTable from '../components/SortTable';

import { connect } from 'react-redux';
import { createAccount } from '../redux/actions';
import AccountRegistry from '../utils/AccountRegistry';
import convert from '../utils/CurrencyConverter';
import _ from 'lodash-es';
import moment from 'moment';

/*
accounts.length > 0 ? accounts
                    .sort(sort(sortType))
                    .map((account, idx) => <tr key={ idx } onClick={ () => history.push(`/accounts/${ account.name }`) } style={ { cursor: 'pointer' } }>
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
 */

const Accounts = ({ accounts, currencies, createAccount, history }) => {
    const [displayActive, setDisplayActive] = useState(false);
    const [displayInputActive, setDisplayInputActive] = useState(false);
    const [displayInput, setDisplayInput] = useState('');
    const [displaySubmitEnabled, setDisplaySubmitEnabled] = useState(false);
    const [displayState, setDisplayState] = useState({});

    return (
        <div style={ { margin: 25 } }>
            <SortTable data={ {
                columns: [{
                    name: 'Name',
                    key: 'name'
                }, {
                    name: 'Type',
                    key: 'type'
                }, {
                    name: 'Value',
                    key: 'value'
                }, {
                    name: 'Last Updated',
                    key: 'lastUpdated'
                }, {
                    name: 'Created',
                    key: 'created'
                }],
                rows: accounts.map(account => ({
                    name: account.name,
                    type: account.constructor.name,
                    value: +convert(currencies, account.value).toFixed(2),
                    lastUpdated: account.lastUpdated.format('MMM Do, YYYY'),
                    created: account.created.format('MMM Do, YYYY'),
                    account
                })),
                customComponents: {
                    value: ({ row }) => _.isEqual(Object.keys(row.account.value), ['USD']) ?
                        <span>{ convert(currencies, row.account.value).toFixed(2) } USD</span> :
                        <i>{ convert(currencies, row.account.value).toFixed(2) } USD</i>
                },
                comparisons: {
                    name: (a, b) => a.localeCompare(b),
                    type: (a, b) => a.localeCompare(b),
                    value: (a, b) => b - a,
                    lastUpdated: (a, b) => moment(a).diff(moment(b)),
                    created: (a, b) => moment(a).diff(moment(b))
                }
            } } initalSortType={ ['value', 'asc'] } footer={ ({ data }) => data.rows.length > 0 ? <tr>
                <td>Total</td>
                <td/>
                <td>
                    {
                        data.rows.reduce((acc, cur) => acc + cur.value, 0).toFixed(2)
                    } USD
                </td>
                <td/>
                <td/>
            </tr> : <td colSpan={ 5 }>No Accounts Yet. Add One to Start!</td> }/>
            <p style={ { fontSize: 10 } }><i>* Italics mark currency conversion</i></p>
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
                            AccountRegistry.getAccountType(displayInput) !== undefined ? createElement(AccountRegistry.getAccountType(displayInput).component, {
                                setEnabled: setDisplaySubmitEnabled,
                                onChange: state => setDisplayState(Object.assign(displayState, state))
                            }) : null
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
