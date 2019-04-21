import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Input, ListGroup, ListGroupItem } from 'reactstrap';
import Layout from '../components/Layout';
import { connect } from 'react-redux';

import { createAccount, setAccounts } from '../redux/actions';
import { neDB } from '../redux/persist';
import AccountTypes from '../implementations/Account';

const Landing = ({ accounts, createAccount, setAccounts }) => {
    const [displayActive, setDisplayActive] = useState(false);
    const [displayInputActive, setDisplayInputActive] = useState(false);
    const [displayInput, setDisplayInput] = useState('');
    const [displaySubmitEnabled, setDisplaySubmitEnabled] = useState(false);
    const [displayState, setDisplayState] = useState({});
    const [initialized, setInitialized] = useState(accounts.loaded);

    useEffect(() => {
        if (!initialized) {
            neDB.accounts.find({}, (err, accounts) => {
                if (err) return console.log(err);
                setAccounts(accounts.map(account => new AccountTypes[account.type](account)));
            });
            setInitialized(true);
        }
    });

    const ChosenType = AccountTypes[displayInput];

    return (
        <Layout>
            <Table style={{ marginTop: 25 }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Value</th>
                        <th>Last Updated</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        accounts.data.length > 0 ? accounts.data.map((account, idx) => <tr key={ idx }>
                            <td>{ account.name }</td>
                            <td>0 USD</td>
                            <td>{ account.lastUpdated.format('MMM Do, YYYY') }</td>
                            <td>{ account.created.format('MMM Do, YYYY') }</td>
                        </tr>) : <tr>
                            <td colSpan={ 3 }>No Accounts Yet. Add One to Start!</td>
                        </tr>
                    }
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
                    <form onSubmit={ e => {
                        e.preventDefault();
                        createAccount(new ChosenType(displayState));
                        setDisplayActive(false);
                        setDisplayInput('');
                        setDisplaySubmitEnabled(false);
                        setDisplayState({});
                    } }>
                    {
                        typeof ChosenType !== 'undefined' ? <ChosenType.Component setEnabled={ setDisplaySubmitEnabled } onChange={ setDisplayState }/> : null
                    }
                        <Button disabled={ !displaySubmitEnabled } type='submit' style={ { width: '25%', marginTop: 5 } }>Create</Button>
                    </form>
                </Card> : null
            }
        </Layout>
    );
};

const mapStateToProps = state => ({
    accounts: state.accounts
});

const mapDispatchToProps = dispatch => ({
    createAccount: account => dispatch(createAccount(account)),
    setAccounts: accounts => dispatch(setAccounts(accounts))
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
