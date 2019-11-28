import AccountModel from '../../models/AccountModel';
import ValueComponent from '../../components/accounts/ValueComponent';

import AccountRegistry from '../../utils/AccountRegistry';

export default class Bank extends AccountModel {
    constructor(data) {
        super(data);
    }
}

AccountRegistry.registerAccountType(Bank, {
    component: ValueComponent,
    bulk: false
});
