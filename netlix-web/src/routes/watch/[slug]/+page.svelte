<script>
	import Chat from '$lib/components/Chat.svelte';
	let isPlaying = false;
	let videoElement;
	export let data;
	const { movie } = data;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div class="w-full h-screen grid md:grid-cols-[70vw_1fr] p-4 gap-4">
		<div class="flex flex-col relative">
			<video controls class="w-full h-full aspect-video rounded-md" bind:this={videoElement}>
				<source src={`http://localhost:3000/upload/${movie.file}`} type="video/mp4" />
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
