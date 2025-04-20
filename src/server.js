const express = require('express');
const app = express();
const apiRoutes = require('./routes/routes');
const path = require("path");

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/api', apiRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server běží na http://localhost:${PORT}`);
});
