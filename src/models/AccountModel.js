import moment from 'moment';

export default class AccountModel {
    constructor(data) {
        const { name, created, lastUpdated, _id } = data;

        this.name = name;
        this.created = moment(created) || moment();
        this.lastUpdated = moment(lastUpdated) || this.created.clone();
        this._id = _id;
    }

    serialize() {
        return Object.assign({}, this, {
            type: this.constructor.name,
            created: this.created.toISOString(),
            lastUpdated: this.lastUpdated.toISOString()
        });
    }
}
