import React, { useState, useEffect, Fragment } from 'react';
import ReactLoading from 'react-loading';

import { connect } from 'react-redux';
import { fetchAccounts } from '../redux/actions';

const Loader = ({ children, fetchAccounts, error, loaded, stage }) => {
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (!initialized) {
            setInitialized(true);
            fetchAccounts();
        }
    });

    return loaded ? children : <Fragment>
        {
            error ? <p style={ { textAlign: 'center', padding: 25, fontSize: 25, color: 'red' } }>{ error }</p> :
                    <p style={ { textAlign: 'center', padding: 25, fontSize: 25 } }>{ stage }</p>
        }
        <ReactLoading type='spin' color='black' style={ { margin: 'auto', height: '10%', width: '10%' } }/>
    </Fragment>;
};

const mapStateToProps = state => ({
    error: state.loading.error,
    loaded: state.accounts.loaded,
    stage: state.loading.stage
});

const mapDispatchToProps = dispatch => ({
    fetchAccounts: () => dispatch(fetchAccounts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
