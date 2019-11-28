import AccountModel from '../../models/AccountModel';
import ValueComponent from '../../components/accounts/ValueComponent';

import AccountRegistry from '../../utils/AccountRegistry';

export default class Cash extends AccountModel {
    constructor(data) {
        super(data);
    }
}

AccountRegistry.registerAccountType(Cash, {
    component: ValueComponent,
    bulk: false
});
