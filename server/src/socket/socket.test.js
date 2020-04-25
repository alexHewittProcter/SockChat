const { expect } = require('chai');
const http = require('http');
const webSocket = require('./socket');
const socketIOClient = require('socket.io-client');

describe('WebSocket', () => {
	let server;
	let client;
	beforeEach((done) => {
		client = socketIOClient('http://localhost:7575');
		server = http.createServer(() => {
			console.log('Server');
		});
		webSocket(server);
		server.listen(7575, () => {
			done();
		});
	});
	afterEach((done) => {
		if (client) {
			client.disconnect();
		}
		if (server) {
			server.close(() => {
				server.unref();
				done();
			});
		}
	});
	it('should broadcast the message to all connected clients', (done) => {
		const message = 'Test message';
		client.on('chat message', (data) => {
			expect(data).to.eq(message);
			done();
		});
		client.emit('chat message', message);
	});
});
