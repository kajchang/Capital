import AccountModel from '../../models/AccountModel';
import ValueComponent from '../../components/ValueComponent';

import AccountRegistry from '../../utils/AccountRegistry';

class Cash extends AccountModel {
    constructor(data) {
        super(data);
    }
}

AccountRegistry.registerAccountType(Cash, ValueComponent, {
    selfReported: true
});
