const express = require('express');
const app = express();
const port = 5000;

// Statická webovka (např. index.html)
app.use(express.static('public'));

// Testovací API endpoint
app.get('/api/status', (req, res) => {
    res.json({ status: 'OK', timestamp: Date.now() });
});

app.listen(port, () => {
    console.log(`Server běží na http://localhost:${port}`);
});
