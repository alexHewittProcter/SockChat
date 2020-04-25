const app = require('express')();
const http = require('http').createServer(app);
require('./socket/socket')(http);
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
	res.send('HELLO');
});

http.listen(port, () => {
	console.log(`Listening on ${port}`);
});

module.exports = app;
