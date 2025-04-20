const cooldown = require('../cooldownState');

module.exports = async function waitForCooldown(req, res, next) {
    if (!cooldown.getCooldown()) {
        return next(); // žádný cooldown, pokračuj hned
    }

    console.log('⏳ Backend cooldown aktivní, čekám...');

    const wait = () =>
        new Promise(resolve => {
            const interval = setInterval(() => {
                if (!cooldown.getCooldown()) {
                    clearInterval(interval);
                    resolve();
                }
            }, 100);
        });

    await wait();
    next();
};
