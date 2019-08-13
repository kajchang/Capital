import React, { Fragment, createElement, useState } from 'react';
import { Button, Card, Input } from 'reactstrap';
import SortTable from '../components/SortTable';
import PopupSearch from '../components/PopupSearch';
import ModalButton from '../components/ModalButton';

import { connect } from 'react-redux';
import { createAccount, createTransaction } from '../redux/actions';
import AccountRegistry from '../utils/AccountRegistry';
import TransactionModel from '../models/TransactionModel';
import { convert, findTransactions } from '../utils/util';
import _ from 'lodash-es';
import moment from 'moment';
import uuid from 'uuid/v1';

const Accounts = ({ accounts, currencies, transactions, createAccount, createTransaction, history }) => {
    const [selectedType, setSelectedType] = useState(null);
    const [displaySubmitEnabled, setDisplaySubmitEnabled] = useState(false);
    const [accountState, setAccountState] = useState({});

    return (
        <div style={ { margin: 25 } }>
            <SortTable data={ {
                columns: [
                    { name: 'Name', key: 'name' },
                    { name: 'Type', key: 'type' },
                    { name: 'Value', key: 'value' },
                    { name: 'Last Updated', key: 'lastUpdated' },
                    { name: 'Created', key: 'created' }
                ],
                rows: accounts.map(account => ({
                    name: account.name,
                    type: account.constructor.name,
                    value: convert(currencies, findTransactions(transactions, account._id)).toFixed(2),
                    lastUpdated: account.lastUpdated.format('MMM Do, YYYY'),
                    created: account.created.format('MMM Do, YYYY'),
                    account
                }))
            } }
            options={ {
                customComponents: {
                    value: ({ row }) => findTransactions(transactions, row.account._id).every(transaction => _.isEqual(Object.keys(transaction.values), ['USD'])) ?
                        <span>{ row.value } USD</span> :
                        <i>{ row.value } USD</i>
                },
                customHooks: {
                    click: ({ row }) => history.push(`/accounts/${ row.account._id }`)
                },
                comparisons: {
                    lastUpdated: (_, __, a, b) => a.account.lastUpdated.diff(b.account.lastUpdated),
                    created: (_, __, a, b) => a.account.created.diff(b.account.created)
                }
            } } initialSortType={ ['created', 'asc'] } footer={ ({ data }) => data.rows.length > 0 ? <tr>
                <td>Total</td>
                <td colSpan={ data.columns.findIndex((({ key }) => key === 'value')) - 1 }/>
                <td>
                    {
                        data.rows.reduce((acc, cur) => acc + +cur.value, 0).toFixed(2)
                    } USD
                </td>
                <td colSpan={ data.columns.length - 1 - data.columns.findIndex((({ key }) => key === 'value')) }/>
            </tr> : <tr>
                <td colSpan={ data.columns.length }>No Accounts Yet. Add One to Start!</td>
            </tr> }/>
            <p style={ { fontSize: 10 } }><i>* Italics mark currency conversion</i></p>
            <ModalButton
                text='+ Add Account'
                component={ ({ close }) => <Card style={ { width: '80vw', padding: 25 } }>
                    <span onClick={ close } style={ { cursor: 'pointer', position: 'absolute', top: 5, right: 5 } }>✕</span>
                    <PopupSearch
                        placeholder='Account Type'
                        maxShown={ 5 }
                        popUpWidth='calc(100% - 50px)'
                        data={ Object.keys(AccountRegistry.getAccountTypes()) }
                        onComplete={ setSelectedType }
                        onInterrupted={ () => setSelectedType(null) }
                    />
                    <form onSubmit={ e => {
                        e.preventDefault();

                        const _id = uuid();
                        const timestamp = moment();
                        const values = accountState.values;
                        delete accountState.values;

                        createAccount(new (AccountRegistry.getAccountType(selectedType))(Object.assign(
                            accountState, { _id, created: timestamp }
                        )));
                        createTransaction(new TransactionModel({
                            name: 'Initial Amount',
                            accountId: _id,
                            values,
                            created: timestamp
                        }));
                        setSelectedType(null);
                        setDisplaySubmitEnabled(false);
                        setAccountState({
                            name: ''
                        });

                        close();
                    } }>
                        {
                            selectedType !== null ? <Fragment>
                                <Input value={ accountState.name } onChange={ e => {
                                    setAccountState({
                                        ...accountState,
                                        name: e.target.value
                                    });
                                } } placeholder='Name' style={ { marginTop: 10, marginBottom: 10 } }/>
                                {
                                    createElement(AccountRegistry.getAccountType(selectedType).component, {
                                        setEnabled: enabled => setDisplaySubmitEnabled(accountState.name && enabled),
                                        onChange: state => setAccountState(Object.assign(accountState, state))
                                    })
                                }
                            </Fragment> : null
                        }
                        <Button disabled={ !displaySubmitEnabled } type='submit' style={ { marginTop: 5 } }>Create</Button>
                    </form>
                </Card> }
            />
        </div>
    );
};

const mapStateToProps = state => ({
    accounts: state.accounts.data,
    currencies: state.currencies.data,
    transactions: state.transactions.data
});

const mapDispatchToProps = dispatch => ({
    createAccount: account => dispatch(createAccount(account)),
    createTransaction: transaction => dispatch(createTransaction(transaction))
});

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
