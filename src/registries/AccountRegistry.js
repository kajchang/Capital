const AccountRegistry = (() => {
    const AccountTypes = {};

    const registerAccountType = (cls, component) => {
        cls.Component = component;
        AccountTypes[cls.name] = cls;
    };

    const getAccountType = type => AccountTypes[type];
    const getAccountTypes = () => AccountTypes;

    return {
        registerAccountType,
        getAccountType,
        getAccountTypes
    };
})();

export default AccountRegistry;
