const arrow = document.querySelector('.arrow');

export function rotateArrow(deg) {
    arrow.style.transform = `rotate(${deg}deg)`;
}
