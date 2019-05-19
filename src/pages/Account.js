import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import SortTable from '../components/SortTable';

import { connect } from 'react-redux';
import moment from 'moment';
import { convert, findTransactions } from '../utils/util';
import _ from 'lodash-es';

const Account = ({ match, accounts, currencies, transactions }) => {
    const account = accounts.find(account => account._id === match.params.accountId);
    return (
        <div className='d-flex flex-column justify-content-around' style={ { margin: 25 } }>
            <Card>
                <CardBody>
                    <CardTitle>
                        <h3>{ account.name }</h3>
                        <span style={ { display: 'block' } }>Created: { moment(account.created).format('MMM Do, YYYY') }</span>
                        <span style={ { display: 'block' } }>Last Updated: { moment(account.lastUpdated).format('MMM Do, YYYY') }</span>
                    </CardTitle>
                </CardBody>
            </Card>
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

export default connect(mapStateToProps)(Account);
