import React, { useState } from 'react';
import { Button, Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import SortTable from '../components/SortTable';
import ModalButton from '../components/ModalButton';
import ValueComponent from '../components/ValueComponent';

import { connect } from 'react-redux';
import moment from 'moment';
import { convert, findTransactions } from '../utils/util';
import _ from 'lodash-es';
import TransactionModel from '../models/TransactionModel';
import { createTransaction, deleteAccount } from '../redux/actions';

const Account = ({ match, accounts, currencies, transactions, createTransaction, deleteAccount, history }) => {
    const account = accounts.find(account => account._id === match.params.accountId);

    const [submitEnabled, setSubmitEnabled] = useState(false);
    const [transactionState, setTransactionState] = useState({});

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
                text='+ Add Transaction'
                component={ ({ close }) => <Card style={ { width: '80vw', padding: 25 } }>
                    <span onClick={ close } style={ { cursor: 'pointer', position: 'absolute', top: 5, right: 5 } }>✕</span>
                    <form onSubmit={ e => {
                        e.preventDefault();

                        createTransaction(new TransactionModel({
                            accountId: account._id,
                            ...transactionState
                        }));
                        setTransactionState({});

                        close();
                    } }>
                        <ValueComponent
                            setEnabled={ setSubmitEnabled }
                            onChange={ state => setTransactionState(Object.assign(transactionState, state)) }
                            currencies={ currencies }
                        />
                        <Button disabled={ !submitEnabled } type='submit' style={ { marginTop: 5 } }>Create</Button>
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
                    value: ({ row }) => _.isEqual(Object.keys(row.transaction.values), ['USD']) ?
                        <span>{ row.value } USD</span> :
                        <i>{ row.value } USD</i>
                },
                comparisons: {
                    date: (a, b) => moment(a, 'MMM Do, YYYY').diff(moment(b, 'MMM Do, YYYY'))
                }
            } } initalSortType={ ['value', 'asc'] } footer={ ({ data }) => data.rows.length > 0 ? <tr>
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
