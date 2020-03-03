const app = require('./app.js');
const db = require('./database')
const port = 2220;

app.listen(port, () => { console.log(`Listening on port ${port}`); });
