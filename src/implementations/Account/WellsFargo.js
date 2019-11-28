import Bank from './Bank';
import UploadReportComponent from '../../components/accounts/UploadReportComponent';

import AccountRegistry from '../../utils/AccountRegistry';

export default class WellsFargo extends Bank {
    constructor(data) {
        super(data);
    }
}

AccountRegistry.registerAccountType(WellsFargo, {
    name: 'Wells Fargo',
    component: UploadReportComponent,
    bulk: true
});
