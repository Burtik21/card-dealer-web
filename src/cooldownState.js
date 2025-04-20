let isCooldown = false;

function startCooldown(duration = 3000) {
    isCooldown = true;
    setTimeout(() => {
        isCooldown = false;
    }, duration);
}

function getCooldown() {
    return isCooldown;
}

module.exports = {
    startCooldown,
    getCooldown
};
