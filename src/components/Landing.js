import React  from 'react';
import { Table, Button } from 'reactstrap';
import Layout from './Layout';

import { withRouter } from 'react-router-dom';

const Landing = ({ history }) => (
    <Layout>
        <Table style={ { marginTop: 25 } }>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Value</th>
                    <th>Last Updated</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colSpan={ 3 }>No Accounts Yet. Add One to Start!</td>
                </tr>
            </tbody>
        </Table>
        <Button onClick={ () => history.push('/createaccount') }>
            + Add Account
        </Button>
    </Layout>
);

export default withRouter(Landing);
