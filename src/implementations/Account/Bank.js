import AccountModel from '../../models/AccountModel';
import ValueComponent from '../../components/ValueComponent';

import AccountRegistry from '../../utils/AccountRegistry';

class Bank extends AccountModel {
    constructor(data) {
        super(data);
    }
}

AccountRegistry.registerAccountType(Bank, ValueComponent, {
    selfReported: true
});
