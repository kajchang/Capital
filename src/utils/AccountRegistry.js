const AccountRegistry = (() => {
    const accountTypes = {};
    const configs = {};

    const registerAccountType = (cls, config) => {
        if (!config.name) {
            config.name = cls.name;
        }
        accountTypes[config.name] = cls;
        cls.config = config;
        configs[config.name] = config;
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
