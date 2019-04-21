import React from 'react';
import Layout from './Layout';

import Accounts from '../implementations/Account';

const CreateAccount = () => (
    <Layout>
        {
            Object.keys(Accounts)
                .map(a => <span>{ a }</span>)
        }
    </Layout>
);

export default CreateAccount;
