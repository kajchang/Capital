import React, { useState, useEffect, Fragment } from 'react';
import ReactLoading from 'react-loading';

import { connect } from 'react-redux';
import { fetchAccounts } from '../redux/actions';

const Loader = ({ children, fetchAccounts, loaded, error }) => {
    const [initialized, setInitialized] = useState(false);
    const [stage, setStage] = useState('');

    useEffect(() => {
        if (!initialized) {
            setInitialized(true);
            setStage('Loading Accounts');
            fetchAccounts();
        }
    });

    return loaded ? children : <Fragment>
        {
            error ? <p style={ { textAlign: 'center', padding: 25, fontSize: 25, color: 'red' } }>{ error }</p> : <p style={ { textAlign: 'center', padding: 25, fontSize: 25 } }>{ stage }</p>
        }
        <ReactLoading type='spin' color='black' style={ { margin: 'auto', height: '10%', width: '10%' } }/>
    </Fragment>;
};

const mapStateToProps = state => ({
    error: state.error,
    loaded: state.accounts.loaded
});

const mapDispatchToProps = dispatch => ({
    fetchAccounts: () => dispatch(fetchAccounts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
