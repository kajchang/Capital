const AccountRegistry = (() => {
    const accountTypes = {};
    const configs = {};

    const registerAccountType = (cls, config) => {
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
        getAccountConfig,
        getAccountTypes
    };
})();

export default AccountRegistry;
