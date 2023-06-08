<script>
	import Icon from '@iconify/svelte';
	/**
     @type {boolean} isPlaying  - stop and play video
    */
	export let isPlaying;
	/**
     @type {()=>void} togglePlay - stop and play video
    */
	export let togglePlay;
</script>

<div class="bg-base-200 rounded-box flex items-center gap-4">
	<ul class="menu flex gap-2 menu-horizontal">
		<li>
			<button on:click={togglePlay}>
				{#if isPlaying}
					<Icon icon="ph:play-fill" class="w-5 h-5" />
				{:else}
					<Icon icon="ph:pause-fill" class="w-5 h-5" />
				{/if}
			</button>
		</li>
	</ul>
	<progress class="progress w-full" value="40" max="100" />
</div>
