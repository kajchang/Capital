import React from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import { PieChart, Pie, Text, Tooltip } from 'recharts';

import { connect } from 'react-redux';
import convert from '../utils/CurrencyConverter';

const Landing = ({ accounts, currencies, history }) => (
    <div className='d-flex' style={ { margin: 25 } }>
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
                            <span style={ { display: 'block' } }>{ payload[0].value } USD</span>
                        </div> : null }/>
                        <Pie
                            data={ accounts.reduce((acc, cur) => {
                                const match = acc.find(data => data.name === cur.constructor.name);

                                if (match) {
                                    match.value += +convert(currencies, cur.value).toFixed(2);
                                } else {
                                    acc.push({
                                        name: cur.constructor.name,
                                        value: +convert(currencies, cur.value).toFixed(2)
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
    </div>
);

const mapStateToProps = state => ({
    accounts: state.accounts.data,
    currencies: state.currencies.data
});

export default connect(mapStateToProps)(Landing);
