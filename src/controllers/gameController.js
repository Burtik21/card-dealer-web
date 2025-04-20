const fetch = require('node-fetch');
const cooldown = require('../cooldownState');


exports.connect = (req, res) => {
    const { user } = req.body;
    console.log(`🔗 [CONNECT] Pokus o připojení uživatele: ${user}`);

    if (state.connectUser(user)) {
        console.log(`✅ [CONNECT] Připojený jako: ${user}`);
        res.json({ ok: true });
    } else {
        console.warn(`❌ [CONNECT] Už je připojen jiný uživatel.`);
        res.status(403).json({ error: 'Rozdávač už někdo ovládá' });
    }
};

exports.kick = (req, res) => {
    console.log(`🦶 [KICK] Odpojuji aktuálního uživatele...`);
    state.kickUser();
    res.json({ ok: true });
};

exports.deal = async (req, res) => {
    const {angle } = req.body;
    let steps = angle * 1.5
    console.log("angle: ",angle)
    console.log(`📥 [DEAL] Požadavek na rozdání:  steps=${steps}`);



    cooldown.startCooldown();
    console.log('⏳ [DEAL] Spuštěn cooldown (3s)');

    try {
        const response = await fetch('http://localhost:5001/python/deal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ steps })
        });

        const data = await response.json();

        console.log(`🎴 [DEAL] Rozdej karta steps: ${steps}°`);
        console.log('✅ [DEAL] Python odpověď:', data);

        res.json({ ok: true, python: data });
    } catch (err) {
        console.error('❌ [DEAL] Chyba při volání Python deal:', err);
        res.status(500).json({ ok: false, error: 'Deal se nepovedl' });
    }
};

exports.calibrate = async (req, res) => {
    console.log(`🛠️ [CALIBRATE] Spouštím kalibraci...`);
    cooldown.startCooldown();
    console.log('⏳ [CALIBRATE] Spuštěn cooldown (3s)');

    try {
        const response = await fetch('http://localhost:5001/python/calibrate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();
        console.log('✅ [CALIBRATE] Python odpověď:', data);

        res.json({ ok: true, python: data });
    } catch (err) {
        console.error('❌ [CALIBRATE] Chyba při kalibraci:', err);
        res.status(500).json({ ok: false, error: 'Kalibrace se nepovedla' });
    }
};

exports.status = (req, res) => {
    const current = state.getCurrentUser();
    console.log(`📡 [STATUS] Dotaz na stav. Připojený uživatel: ${current || 'nikdo'}`);
    res.json({ currentUser: current });
};
