import {writable} from 'svelte/store';
import { CHAT_API } from '$lib/utils/api';

const messageStore = writable('');

const socket = new WebSocket(`${CHAT_API}/chat`);

socket.addEventListener('open', function(event) { console.log("It's open"); });

socket.addEventListener('message', function(event) {
  messageStore.set(event.data);
  console.log(event.data);
});

/**
 * @param {string} message
 */
const sendMessage = (message) => {
  if (socket.readyState <= 1) {
    socket.send(message);
  }
};

export default {subscribe: messageStore.subscribe, sendMessage};
