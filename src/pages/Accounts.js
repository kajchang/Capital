import React, { createElement, useState } from 'react';
import { Button, Card } from 'reactstrap';
import SortTable from '../components/SortTable';
import PopupSearch from '../components/PopupSearch';
import ButtonContent from '../components/ButtonContent';

import { connect } from 'react-redux';
import { createAccount, createTransaction } from '../redux/actions';
import AccountRegistry from '../utils/AccountRegistry';
import convert from '../utils/CurrencyConverter';
import _ from 'lodash-es';
import moment from 'moment';
import uuid from 'uuid/v1';
import TransactionModel from '../models/TransactionModel';

const Accounts = ({ accounts, currencies, transactions, createAccount, createTransaction, history }) => {
    const [selectedType, setSelectedType] = useState(null);
    const [displaySubmitEnabled, setDisplaySubmitEnabled] = useState(false);
    const [typeState, setTypeState] = useState({});

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
                    value: +convert(currencies, transactions.filter(transaction => transaction.accountId === account._id)).toFixed(2),
                    lastUpdated: account.lastUpdated.format('MMM Do, YYYY'),
                    created: account.created.format('MMM Do, YYYY'),
                    account
                }))
            } }
            options={ {
                customComponents: {
                    value: ({ row }) => transactions.filter(transaction => transaction.accountId === row.account._id).some(transaction => _.isEqual(Object.keys(transaction.values), ['USD'])) ?
                        <span>{ convert(currencies, transactions.filter(transaction => transaction.accountId === row.account._id)).toFixed(2) } USD</span> :
                        <i>{ convert(currencies, transactions.filter(transaction => transaction.accountId === row.account._id)).toFixed(2) } USD</i>
                },
                customHooks: {
                    click: ({ row }) => history.push(`/accounts/${ row.account._id }`)
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
                <td colSpan={ data.columns.findIndex((({ key }) => key === 'value')) - 1 }/>
                <td>
                    {
                        data.rows.reduce((acc, cur) => acc + cur.value, 0).toFixed(2)
                    } USD
                </td>
                <td colSpan={ data.columns.length - 1 - data.columns.findIndex((({ key }) => key === 'value')) }/>
            </tr> : <tr>
                <td colSpan={ data.columns.length }>No Accounts Yet. Add One to Start!</td>
            </tr> }/>
            <p style={ { fontSize: 10 } }><i>* Italics mark currency conversion</i></p>
            <ButtonContent text='+ Add Account'>
                <Card style={ { width: '50%', padding: 25 } }>
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
                        const initialValue = typeState.initialValue;
                        delete typeState.initialValue;

                        createAccount(new (AccountRegistry.getAccountType(selectedType))(Object.assign(
                            typeState, { _id, created: timestamp }
                        )));
                        createTransaction(new TransactionModel({
                            name: 'Initial Amount',
                            accountId: _id,
                            values: initialValue,
                            created: timestamp
                        }));
                        setSelectedType(null);
                        setDisplaySubmitEnabled(false);
                        setTypeState({});
                    } }>
                        {
                            selectedType !== null ? createElement(AccountRegistry.getAccountType(selectedType).component, {
                                setEnabled: setDisplaySubmitEnabled,
                                onChange: state => setTypeState(Object.assign(typeState, state))
                            }) : null
                        }
                        <Button disabled={ !displaySubmitEnabled } type='submit' style={ { width: '25%', marginTop: 5 } }>Create</Button>
                    </form>
                </Card>
            </ButtonContent>
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
