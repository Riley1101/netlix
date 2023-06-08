<script>
	import { onMount } from 'svelte';
	import store from '../stores/store';
	/**
	 *@type {string}
	 */
	let message;
	/**
	 *@type {string[]}
	 */
	let messages = [];
	onMount(() => {
		store.subscribe((currentMessage) => {
			messages = [...messages, currentMessage];
		});
	});
	function onSendMessage() {
		if (message.length > 0) {
			store.sendMessage(message);
			message = '';
		}
	}
</script>

<div class=" bg-neutral p-4 rounded-md h-full flex justify-between flex-col">
	<div class=" overflow-y-auto max-h-[70vh]">
		{#each messages as message, i}
			<div class="chat chat-end">
				<div class="chat-image placeholder avatar">
					<div class="bg-base-100 text-neutral-content rounded-full w-12">
						<span class="text-xl">JO</span>
					</div>
				</div>
				<div class="chat-bubble bg-base-100">{message}</div>
			</div>
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
