import { createSpots } from './spots.js';
import { rotateArrow } from './arrow.js';
import { calibrate, deal } from './api.js';
import { startCooldown, getCooldown } from './cooldown.js';

const spotsContainer = document.getElementById('spots');
const dealBtn = document.getElementById('deal-btn');
const calibrateBtn = document.getElementById('calibrate-btn');

createSpots(spotsContainer, 10, 150, () => {
    dealBtn.disabled = false;
});

dealBtn.addEventListener('click', () => {
    if (getCooldown()) return;

    const selected = document.querySelector('.spot.active');
    if (!selected) return;

    const angle = parseFloat(selected.dataset.deg);
    deal(angle).then(() => console.log('✅ DEAL OK (ručně)'));
    startCooldown();
});

calibrateBtn.addEventListener('click', () => {
    if (getCooldown()) return;

    rotateArrow(0);
    calibrate().then(() => console.log('✅ Kalibrace hotová'));
    startCooldown();
});
