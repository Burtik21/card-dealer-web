// 📡 Pošli úhel na /api/deal
export function deal(angle, user = 'user1') {
    return fetch('/api/deal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ angle, user })
    }).then(res => res.json());
}

// 🛠️ Kalibrace – pošle POST na /api/calibrate
export function calibrate() {
    return fetch('/api/calibrate', {
        method: 'POST'
    }).then(res => res.json());
}

// 👋 Kickne aktuálního uživatele
export function kick() {
    return fetch('/api/kick', {
        method: 'POST'
    }).then(res => res.json());
}

// 🔗 Připojení uživatele
export function connect(user = 'user1') {
    return fetch('/api/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user })
    }).then(res => res.json());
}

// 🧠 Zjisti status (např. kdo je připojený)
export function getStatus() {
    return fetch('/api/status')
        .then(res => res.json());
}
