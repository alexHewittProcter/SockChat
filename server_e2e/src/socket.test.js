const socketIOClient = require('socket.io-client');
const { expect } = require('chai');

const serverUrl = process.env.SERVER_URL || 'http://localhost:4000';

let clientOne;
let clientTwo;

describe('SockChat web socket regression', () => {
	beforeEach((done) => {
		clientOne = socketIOClient(serverUrl);
		clientTwo = socketIOClient(serverUrl);
		done();
	});
	afterEach((done) => {
		if (clientOne) clientOne.disconnect();
		if (clientTwo) clientTwo.disconnect();
		done();
	});
	describe('Sending a message', () => {
		const sendMessage = 'hello world';
		it('should broadcase the same message back to the sender', (done) => {
			clientOne.on('chat message', (data) => {
				expect(data).to.eql(sendMessage);
				done();
			});
			clientOne.emit('chat message', sendMessage);
		});
		it('should broadcast the same message from the sender to another client', (done) => {
			clientTwo.on('chat message', (data) => {
				expect(data).to.eql(sendMessage);
				done();
			});
			clientOne.emit('chat message', sendMessage);
		});
	});
});
