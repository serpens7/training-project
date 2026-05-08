module.exports = {
    process() {
        return {
            code: `
                const React = require('react');
                module.exports = {
                    __esModule: true,
                    default: () => React.createElement('div'),
                    ReactComponent: () => React.createElement('div'),
                };
            `,
        };
    },
};
