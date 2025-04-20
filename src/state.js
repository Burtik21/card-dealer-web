let currentUser = null;

module.exports = {
    getCurrentUser: () => currentUser,
    connectUser: (user) => {
        if (!currentUser) {
            currentUser = user;
            return true;
        }
        return currentUser === user;
    },
    kickUser: () => currentUser = null,
    isUserAuthorized: (user) => user === currentUser
};
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
