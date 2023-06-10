import { API_END } from "$lib/utils/api";
export const load = async () => {
	const movies = await fetch(`${API_END}/movies`).then((res) => res.json());
	return {
		...movies
	};
};
