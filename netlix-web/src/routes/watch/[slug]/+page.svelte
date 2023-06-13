<script>
	import Chat from '$lib/components/Chat.svelte';
	import store from '$lib/stores/store';
	import { API_END } from '$lib/utils/api';
	import { onMount } from 'svelte';
	/**@type {HTMLVideoElement} */
	let videoElement;
	export let data;
	const { movie } = data;
	const url = `${API_END}/upload/${movie.file}`;
	onMount(() => {
		store.timeStampSubscribe((timeStamp) => {

		});
		videoElement.addEventListener('timeupdate', (_) => {
			store.streamTimeStamp({
				type: 'updateTime',
                duration: videoElement.duration,
                paused: videoElement.paused,
				currentTime: videoElement.currentTime
			});
		});
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div class="w-full h-screen grid md:grid-cols-[70vw_1fr] p-4 gap-4">
		<div class="flex flex-col relative">
			<video controls class="w-full h-full aspect-video rounded-md" bind:this={videoElement}>
				<source src={url} type="video/mp4" />
				<track kind="captions" />
			</video>
		</div>
		<div>
			<Chat />
		</div>
	</div>
</section>

<style>
</style>
