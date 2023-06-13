<script>
	const tmp = [1, 2, 3, 4];

	/**
	 * @type {{ movies: {title:string,plot:string,file:string,_id:string}[] }}
	 */
	export let data;
    console.log(data)
	const { movies } = data;
</script>

<div class="container w-full h-full p-12 grid grid-cols-4 mx-auto gap-8">
	{#each movies as item}
		<div class="card bg-neutral">
			<div class="card-body flex gap-2">
				<h2 class="card-title">{item.title}</h2>
				<p>{item.plot}</p>
				<div class="card-actions justify-end">
					<a class="btn btn-primary" href={`/watch/${item._id}`}>Watch Now !</a>
				</div>
			</div>
		</div>
	{/each}
</div>
