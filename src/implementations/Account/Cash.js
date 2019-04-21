import AccountModel from '../../models/AccountModel';
import JustName from '../../components/JustName';

export default class Cash extends AccountModel {
    constructor(name) {
        super(name);
    }
}

Cash.Component = JustName;
