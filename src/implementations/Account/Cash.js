import AccountModel from '../../models/AccountModel';
import JustName from '../../components/JustName';

import AccountRegistry from '../../registries/AccountRegistry';

class Cash extends AccountModel {
    constructor(data) {
        super(data);
    }
}

AccountRegistry.registerAccountType(Cash, JustName);
