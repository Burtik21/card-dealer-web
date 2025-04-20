import { rotateArrow } from './arrow.js';


export function createSpots(container, numberOfSpots = 10, radius = 150, onActivate = () => {}) {
    for (let i = 0; i < numberOfSpots; i++) {
        const angle = (2 * Math.PI / numberOfSpots) * i;
        const deg = (360 / numberOfSpots) * i;
        const x = Math.cos(angle + Math.PI / 2) * radius;
        const y = Math.sin(angle + Math.PI / 2) * radius;

        const spot = document.createElement('div');
        spot.classList.add('spot');
        spot.style.left = `calc(50% + ${x}px - 25px)`;
        spot.style.top = `calc(50% + ${y}px - 25px)`;
        spot.dataset.deg = deg;
        container.appendChild(spot);

        spot.addEventListener('click', () => {


            document.querySelectorAll('.spot').forEach(s => s.classList.remove('active'));
            spot.classList.add('active');

            rotateArrow(deg);
            console.log(`▶️ Kliknuto na spot – úhel: ${deg.toFixed(2)}°`);

            onActivate();

        });
    }
}
