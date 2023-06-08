export const load = async () => {
	const movies = await fetch('http://localhost:3000/movies').then((res) => res.json());
	return {
		...movies
	};
};
