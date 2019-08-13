const AccountRegistry = (() => {
    const accountTypes = {};
    const configs = {};

    const registerAccountType = (cls, component, config) => {
        cls.component = component;
        accountTypes[cls.name] = cls;
        cls.config = config;
        configs[cls.name] = config;
    };

    const getAccountType = type => accountTypes[type];
    const getAccountConfig = type => configs[type];
    const getAccountTypes = () => accountTypes;

    return {
        registerAccountType,
        getAccountType,
        getAccountTypes
    };
})();

export default AccountRegistry;
