const convert = (rates, transactions) => transactions
    .reduce((total, transaction) => total + Object.keys(transaction.values)
        .reduce((transactionTotal, currency) => transactionTotal + transaction.values[currency] / rates[currency], 0), 0);

export default convert;
