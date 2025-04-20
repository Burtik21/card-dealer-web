const spotsContainer = document.getElementById('spots');
const numberOfSpots = 10;
const radius = 150;
const arrow = document.querySelector('.arrow');
const status = document.getElementById('status');
let isCooldown = false;

function startCooldown(duration = 3000) {
    isCooldown = true;

    // Volitelně: zakázat tlačítka vizuálně
    dealButton.disabled = true;
    calibrateBtn.disabled = true;

    setTimeout(() => {
        isCooldown = false;

        // Povol deal button, ale jen pokud je něco vybranýho
        if (document.querySelector('.spot.active')) {
            dealButton.disabled = false;
        }

        calibrateBtn.disabled = false;
    }, duration);
}

for (let i = 0; i < numberOfSpots; i++) {

    const angle = (2 * Math.PI / numberOfSpots) * i;

    // DOLE = 0°, proti směru hodin → zvětšujeme úhel odspodu
    const deg = (360 / numberOfSpots) * i;

    // + PI/2 = 90° => posune 0° dolů
    const x = Math.cos(angle + Math.PI / 2) * radius;
    const y = Math.sin(angle + Math.PI / 2) * radius;

    const spot = document.createElement('div');
    spot.classList.add('spot');
    spot.style.left = `calc(50% + ${x}px - 25px)`;
    spot.style.top = `calc(50% + ${y}px - 25px)`;
    spot.dataset.deg = deg;
    spotsContainer.appendChild(spot);

    spot.addEventListener('click', () => {
        if (isCooldown) return;
        // Odstraň .active ze všech
        document.querySelectorAll('.spot').forEach(s => s.classList.remove('active'));

// Přidej .active na ten kliknutej
        spot.classList.add('active');
        document.getElementById('deal-btn').disabled = false;
        // otoč šipku přesně na úhel (bez minusu!)
        arrow.style.transform = `rotate(${deg}deg)`;

        console.log(`▶️ Kliknuto na spot – úhel: ${deg.toFixed(2)}°`);
        status.textContent = `Směr výhozu: ${deg.toFixed(2)}°`;

        fetch('/api/deal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ angle: deg })
        })
            .then(res => res.json())
            .then(data => {
                console.log('✅ DEAL OK:', data);
            })
            .catch(err => {
                console.error('❌ DEAL ERROR:', err);
            });
        startCooldown()
    });
}

const dealButton = document.getElementById('deal-btn');

dealButton.addEventListener('click', () => {
    if (isCooldown) return;
    const selected = document.querySelector('.spot.active');

    if (!selected) {
        console.warn('❌ Nelze rozdat – není vybrán žádný spot');
        return;
    }

    const angle = parseFloat(selected.dataset.deg);
    console.log(`🎯 ROZDAT klik – směr: ${angle.toFixed(2)}°`);

    fetch('/api/deal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ angle })
    })
        .then(res => res.json())
        .then(data => {
            console.log('✅ DEAL OK (ručně):', data);
        })
        .catch(err => {
            console.error('❌ DEAL ERROR (ručně):', err);
        });
    startCooldown();
});
const calibrateBtn = document.getElementById('calibrate-btn');

calibrateBtn.addEventListener('click', () => {
    if (isCooldown) return;
    console.log('🛠️ Kliknuto na KALIBRACI');

    // Otočení šipky dolů (0°)
    arrow.style.transform = 'rotate(0deg)';

    // Poslání na backend
    fetch('/api/calibrate', {
        method: 'POST'
    })
        .then(res => res.json())
        .then(data => {
            if (data.ok) {
                console.log('✅ Kalibrace úspěšná');
            } else {
                console.warn('⚠️ Kalibrace chyba:', data);
            }
        })
        .catch(err => {
            console.error('❌ Kalibrace fail:', err);
        });
    startCooldown();
});




