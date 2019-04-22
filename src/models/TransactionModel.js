import moment from 'moment';

export default class TransactionModel {
    constructor(data) {
        const { name, accountId, values, created } = data;

        this.name = name;
        this.accountId = accountId;
        this.values = values;
        this.created = moment(created) || moment();
    }

    serialize() {
        return Object.assign({}, this, {
            values: this.values,
            created: this.created.toISOString()
        });
    }
}
