<script>
	import Chat from '$lib/components/Chat.svelte';
	let videoElement;
	export let data;
	const { movie } = data;
    const api = process.env.API_END;
    const url = `http://${api}/upload/${movie.file}`;
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
