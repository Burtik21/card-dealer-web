let isCooldown = false;

export function startCooldown(duration = 3000, onDone = () => {}) {
    isCooldown = true;
    const dealBtn = document.getElementById('deal-btn');
    const calibrateBtn = document.getElementById('calibrate-btn');

    dealBtn.disabled = true;
    calibrateBtn.disabled = true;

    dealBtn.classList.add('cooldown');
    calibrateBtn.classList.add('cooldown');

    setTimeout(() => {
        isCooldown = false;

        // Znovu povolit
        if (document.querySelector('.spot.active')) {
            dealBtn.disabled = false;
        }
        calibrateBtn.disabled = false;

        dealBtn.classList.remove('cooldown');
        calibrateBtn.classList.remove('cooldown');
    }, duration);
}

export function getCooldown() {
    return isCooldown;
}
