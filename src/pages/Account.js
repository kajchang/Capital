import React, { createElement, useState, useRef } from 'react';
import { Button, Card, CardBody, CardTitle, Row, Col, Input } from 'reactstrap';
import SortTable from '../components/SortTable';
import ModalButton from '../components/ModalButton';

import { connect } from 'react-redux';
import moment from 'moment';
import { convert, findTransactions } from '../utils/util';
import _ from 'lodash-es';
import { createTransaction, deleteAccount } from '../redux/actions';

const Account = ({ match, accounts, currencies, transactions, createTransaction, deleteAccount, history }) => {
    const account = accounts.find(account => account._id === match.params.accountId);
    const accountType = account.__proto__.constructor;

    const [transactionName, setTransactionName] = useState('');

    const [submitEnabled, setSubmitEnabled] = useState(false);
    const onSubmit = useRef(() => {});

    return (
        <div style={ { margin: 25 } }>
            <Card>
                <CardBody>
                    <CardTitle>
                        <h3>{ account.name }</h3>
                        <span style={ { display: 'block' } }>Created: { moment(account.created).format('MMM Do, YYYY') }</span>
                        <span style={ { display: 'block' } }>Last Updated: { moment(account.lastUpdated).format('MMM Do, YYYY') }</span>
                    </CardTitle>
                </CardBody>
            </Card>
            <ModalButton
                text={ accountType.config.bulk ? 'Update Account' : '+ Add Transaction' }
                component={ ({ close }) => <Card style={ { width: '80vw', padding: 25 } }>
                    <span onClick={ close } style={ { cursor: 'pointer', position: 'absolute', top: 5, right: 5 } }>✕</span>
                    <form onSubmit={ e => {
                        e.preventDefault();

                        onSubmit.current({
                            accountId: account._id,
                            name: transactionName
                        });
                        setTransactionName('');

                        close();
                    } }>
                        {
                            !accountType.config.bulk ?
                                <Input value={ transactionName } onChange={ e => setTransactionName(e.target.value) } placeholder='Name' style={ { marginTop: 10, marginBottom: 10 } }/> : null
                        }
                        {
                            createElement(accountType.config.component, {
                                setEnabled: setSubmitEnabled,
                                useOnSubmit: func => onSubmit.current = func
                            })
                        }
                        <Button disabled={ !(submitEnabled && transactionName) } type='submit' style={ { marginTop: 5 } }>Add</Button>
                    </form>
                </Card> }
                buttonProps={ {
                    style: {
                        margin: 5
                    }
                } }
            />
            <ModalButton
                text='Delete Account'
                component={ ({ close }) => <Card>
                    <Row style={ { margin: 10 } } noGutters>
                        <Col>
                            <Button
                                onClick={ close }
                                style={ { marginRight: 2.5 } }
                                color='danger'>Cancel</Button>
                        </Col>
                        <Col>
                            <Button
                                onClick={ () => {
                                    deleteAccount(account._id);
                                    history.push('/accounts');
                                } }
                                style={ { marginLeft: 2.5 } }
                                color='success'>Confirm</Button>
                        </Col>
                    </Row>
                </Card> }
                buttonProps={ {
                    color: 'danger',
                    style: {
                        margin: 5
                    }
                } }
            />
            <SortTable data={ {
                columns: [
                    { name: 'Name', key: 'name' },
                    { name: 'Value', key: 'value' },
                    { name: 'Date', key: 'date' }
                ],
                rows: findTransactions(transactions, account._id).map(transaction => ({
                    name: transaction.name,
                    value: convert(currencies, [transaction]).toFixed(2),
                    date: transaction.created.format('MMM Do, YYYY'),
                    transaction
                }))
            } }
            options={ {
                customComponents: {
                    value: ({ row }) => {
                        let inner, color;

                        if (row.value >= 0) {
                            inner = `+${ row.value } USD`;
                            color = 'green';
                        } else {
                            inner = `${ row.value } USD`;
                            color = 'red';
                        }

                        if (_.isEqual(Object.keys(row.transaction.values), ['USD'])) {
                            return <span style={ { color } }>{ inner }</span>;
                        } else {
                            return <i style={ { color } }>{ inner } ({ Object.keys(row.transaction.values)
                                .map(value => `${ row.transaction.values[value] >= 0 ? '+' : '-' }${ row.transaction.values[value] } ${ value }`)
                                .join(', ') })</i>;
                        }
                    }
                },
                comparisons: {
                    date: (_, __, a, b) => a.transaction.created.diff(b.transaction.created)
                }
            } } initialSortType={ ['date', 'asc'] } footer={ ({ data }) => data.rows.length > 0 ? <tr>
                <td>Total</td>
                {
                    data.columns.findIndex((({ key }) => key === 'value')) - 1 > 0 ? <td colSpan={ data.columns.findIndex((({ key }) => key === 'value')) - 1 }/> : null
                }
                <td>
                    {
                        data.rows.reduce((acc, cur) => acc + +cur.value, 0).toFixed(2)
                    } USD
                </td>
                {
                    data.columns.length - 1 - data.columns.findIndex((({ key }) => key === 'value')) ? <td colSpan={ data.columns.length - 1 - data.columns.findIndex((({ key }) => key === 'value'))}/> : null
                }
            </tr> : null }
            />
            <p style={ { fontSize: 10 } }><i>* Italics mark currency conversion</i></p>
        </div>
    );
};

const mapStateToProps = state => ({
    accounts: state.accounts.data,
    currencies: state.currencies.data,
    transactions: state.transactions.data
});

const mapDispatchToProps = dispatch => ({
    createTransaction: transaction => dispatch(createTransaction(transaction)),
    deleteAccount: _id => dispatch(deleteAccount(_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
