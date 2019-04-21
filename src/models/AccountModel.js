import moment from 'moment';

export default class AccountModel {
    constructor(data) {
        this.name = data.name;
        this.created = moment(data.created) || moment();
        this.lastUpdated = moment(data.lastUpdated) || this.created.clone();
    }

    sync() {

    }

    serialize() {
        return Object.assign({}, this, {
            type: this.constructor.name,
            created: this.created.toISOString(),
            lastUpdated: this.lastUpdated.toISOString()
        });
    }
}
