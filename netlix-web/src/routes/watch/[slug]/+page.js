export const ssr = false;
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 * @returns {Promise<any>}
 */
export const load = async ({ params }) => {
	const { slug } = params;
	const data = await fetch('http://localhost:3000/movies/' + slug).then((res) => res.json());
	return {
		...data
	};
};
