export const ssr = false;
import { API_END } from '$lib/utils/api';
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 * @returns {Promise<any>}
 */
export const load = async ({ params }) => {
	const { slug } = params;
	const data = await fetch(`${API_END}/movies/` + slug).then((res) => res.json());
	return {
		...data
	};
};
