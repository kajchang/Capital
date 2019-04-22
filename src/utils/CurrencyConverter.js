const convert = (rates, value) => Object.keys(value)
    .reduce((acc, cur) => acc += value[cur] / rates[cur], 0);

export default convert;
