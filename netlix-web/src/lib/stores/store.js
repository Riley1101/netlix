import { CHAT_API } from '$lib/utils/api';
import { writable } from 'svelte/store';
const messageStore = writable();

const timeStampStore = writable({ currentTime: 0, duration: 0, paused: 'paused' });

const socket = new WebSocket(`${CHAT_API}/chat`);
socket.addEventListener('open', function () {
	console.log("It's open");
});
socket.addEventListener('message', function (event) {
	try {
		/**
		 * @type {import('../types').SocketData}
		 * */
		const data = JSON.parse(event.data);
		console.log(data);
		if (data.data.type === 'message') {
			messageStore.set(data);
		} else if (data.data.type === 'video') {
			/**
			timeStampStore.set({
				currentTime: data.currenttTime,
				duration: data.duration,
				paused: data.paused
			});
            */
		}
	} catch (err) {
		console.log(err);
	}
});

/**
 * @param {string} message
 * @param {string} room
 * @param {string} name
 */
const sendMessage = (message, room, name) => {
	const data = {
		payload: { type: 'join', room: room, name: name },
		data: { type: 'message', message: message }
	};
	if (socket.readyState <= 1) {
		socket.send(JSON.stringify(data));
	}
};

/**
 * @param {import('../types').Video} time
 */
function streamTimeStamp(time) {
	if (socket.readyState <= 1) {
		socket.send(JSON.stringify(time));
	}
}
export default {
	timeStampSubscribe: timeStampStore.subscribe,
	messageSubscribe: messageStore.subscribe,
	sendMessage,
	streamTimeStamp
};
