const convert = (rates, transactions) => transactions
    .reduce((total, transaction) => total + Object.keys(transaction.values)
        .reduce((transactionTotal, currency) => transactionTotal + transaction.values[currency] / rates[currency], 0), 0);

const findTransactions = (transactions, _id) => transactions
    .filter(transaction => transaction.accountId === _id);

const findAccount = (accounts, _id) => accounts
    .find(account => account._id === _id);

export {
    convert,
    findAccount,
    findTransactions
};
