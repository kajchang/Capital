import React, { Fragment } from 'react';
import { Card, CardBody, CardTitle, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { PieChart, Pie, Text, Tooltip } from 'recharts';

import { connect } from 'react-redux';
import { convert, findAccount, findTransactions } from '../utils/util';
import moment from 'moment';
import _ from 'lodash-es';

const Landing = ({ accounts, currencies, transactions, history }) => (
    <div className='d-flex justify-content-around' style={ { margin: 25 } }>
        <Card>
            <CardBody>
                <CardTitle>
                    <h3>Accounts</h3>
                </CardTitle>
                <p>{ accounts.length } Account{ accounts.length === 1 ? '' : 's' }</p>
                {
                    accounts.length > 0 ? <PieChart width={ 300 } height={ 300 }>
                        <Tooltip content={ ({ active, payload }) => active ? <div style={ { background: '#fff', padding: 10, borderRadius: 5, minWidth: 75 } }>
                            <span style={ { display: 'block' } }>{ payload[0].name }</span>
                            <span style={ { display: 'block' } }>{ payload[0].payload.count } Account{ payload[0].payload.count === 1 ? '' : 's' }</span>
                            <span style={ { display: 'block' } }>{ payload[0].value} USD</span>
                        </div> : null }/>
                        <Pie
                            data={ accounts.reduce((acc, cur) => {
                                const match = acc.find(data => data.name === cur.constructor.config.name);

                                if (match) {
                                    match.value += +convert(currencies, findTransactions(transactions, cur._id)).toFixed(2);
                                    match.count++;
                                } else {
                                    acc.push({
                                        name: cur.constructor.config.name,
                                        value: +convert(currencies, findTransactions(transactions, cur._id)).toFixed(2),
                                        count: 1
                                    });
                                }

                                return acc;
                            }, []) }
                            dataKey='value'
                            nameKey='name'
                            cx='50%' cy='50%'
                            innerRadius={ 60 } outerRadius={ 80 }
                            fill='#228b22'
                            label={ ({ cx, cy, midAngle, innerRadius, outerRadius, fill, name }) => {
                                const RADIAN = Math.PI / 180;

                                const radius = innerRadius + (outerRadius - innerRadius) * 2.25;
                                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                                return (
                                    <Text x={ x } y={ y } fill={ fill } textAnchor={ x > cx ? 'start' : 'end' }>{ name }</Text>
                                );
                            } }
                        />
                    </PieChart> : <div style={ { width: 300, height: 300, lineHeight: '300px', textAlign: 'center' } }>
                        <span>No Accounts Yet.</span>
                    </div>
                }
                <Button onClick={ () => history.push('/accounts') }>See Accounts ></Button>
            </CardBody>
        </Card>
        <Card>
            <CardBody>
                <CardTitle>
                    <h3>Transactions</h3>
                </CardTitle>
                <p>{ transactions.length } Transaction{ transactions.length === 1 ? '' : 's' }</p>
                {
                    transactions.length > 0 ? <Fragment>
                        <ListGroup style={ { width: 300 } }>
                            {
                                transactions
                                    .sort((a, b) => moment(b.created).diff(moment(a.created)))
                                    .slice(0, 3)
                                    .map((transaction, idx) => <ListGroupItem className='d-flex justify-content-between' key={ idx }>
                                        <div>
                                            <h5>{ transaction.name }</h5>
                                            <span>{ findAccount(accounts, transaction.accountId).name }</span>
                                        </div>
                                        <div>
                                            {
                                                (() => {
                                                    let inner, color;

                                                    const value = convert(currencies, [transaction]).toFixed(2);

                                                    if (value >= 0) {
                                                        inner = `+${ value } USD`;
                                                        color = 'green';
                                                    } else {
                                                        inner = `${ value } USD`;
                                                        color = 'red';
                                                    }

                                                    if (_.isEqual(Object.keys(transaction.values), ['USD'])) {
                                                        return <span style={ { color } }>{ inner }</span>;
                                                    } else {
                                                        return <i style={ { color } }>{ inner }</i>;
                                                    }
                                                })()
                                            }
                                        </div>
                                    </ListGroupItem>)
                            }
                        </ListGroup>
                        <p style={ { fontSize: 10 } }><i>* Italics mark currency conversion</i></p>
                    </Fragment> : <div style={ { width: 300, height: 300, lineHeight: '300px', textAlign: 'center' } }>
                        <span>No Transactions Yet.</span>
                    </div>
                }
            </CardBody>
        </Card>
    </div>
);

const mapStateToProps = state => ({
    accounts: state.accounts.data,
    currencies: state.currencies.data,
    transactions: state.transactions.data
});

export default connect(mapStateToProps)(Landing);
