const AccountRegistry = (() => {
    const accountTypes = {};

    const registerAccountType = (cls, component) => {
        cls.component = component;
        accountTypes[cls.name] = cls;
    };

    const getAccountType = type => accountTypes[type];
    const getAccountTypes = () => accountTypes;

    return {
        registerAccountType,
        getAccountType,
        getAccountTypes
    };
})();

export default AccountRegistry;
