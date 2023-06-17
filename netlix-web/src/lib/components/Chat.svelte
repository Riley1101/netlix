<script>
	import { onMount } from 'svelte';
	import store from '../stores/store';
	/**
	 *@type {string}
	 */
	let message;

	/**
	 *@type {string} - roomID
	 */
	let roomID;
	/**
	 *@type {string} - roonInput
	 */
	let roomInput;
	/**
	 *@type {any}
	 */
	let messages = [];
	onMount(() => {
		store.roomStoreSubscribe((currentRoom) => {
			roomID = currentRoom;
		});
		store.messageSubscribe((currentMessage) => {
			console.log(currentMessage);
		});
	});

	function joinRoom() {
		store.sendMessage('join', 'Let me Join', roomInput, 'arkar');
	}

	function createRoom() {
		store.sendMessage('create', 'movieName', null, 'arkar');
	}
	function onSendMessage() {
		if (message.length > 0) {
			store.sendMessage('join', 'room1', 'arkar');
			message = '';
		}
	}
</script>

<div class=" bg-neutral p-4 rounded-md h-full flex justify-between flex-col">
	<div>
		{#if !roomID}
			<div class="flex gpap-4 my-4 gap-4">
				<div class="flex gap-4">
					<input
						bind:value={roomInput}
						type="text"
						placeholder="Type here"
						class="input input-bordered input-primary w-full"
					/>
					<button class="btn" on:click={joinRoom}>Join Room</button>
				</div>
				<button class="btn" on:click={createRoom}>Create Room</button>
			</div>
		{/if}
		{#if roomID}
			<div class="mockup-code">
				<pre data-prefix="$"><code>{roomID}</code></pre>
			</div>
		{/if}
	</div>
	<div class=" overflow-y-auto max-h-[70vh]">
		{#each messages as ms}
			{#if ms !== undefined}
				<div class="chat chat-end">
					<div class="chat-image placeholder avatar">
						<div class="bg-base-100 text-neutral-content rounded-full w-12">
							<span class="text-xl">JO</span>
						</div>
					</div>
					<div class="chat-bubble bg-base-100">{ms.data.message}</div>
				</div>
			{/if}
		{/each}
	</div>
	<div class="w-full flex items-center gap-2">
		<input
			bind:value={message}
			type="text"
			placeholder="Type here"
			class="input input-bordered input-md w-full"
		/>
		<button on:click={onSendMessage} class="btn btn-md bg-base-100">Send</button>
	</div>
</div>
