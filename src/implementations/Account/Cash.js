import AccountModel from '../../models/AccountModel';
import CashComponent from '../../components/CashComponent';

import AccountRegistry from '../../registries/AccountRegistry';

class Cash extends AccountModel {
    constructor(data) {
        super(data);
    }
}

AccountRegistry.registerAccountType(Cash, CashComponent);
