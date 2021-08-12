import axios from 'axios';

export const getCategories = async () =>
	await axios.get(`localhost:${process.env.PORT}/categories`);

export const getCategory = async (slug) =>
	await axios.get(`localhost:${process.env.PORT}/category/${slug}`);

export const removeCategory = async (slug, authtoken) =>
	await axios.delete(`localhost:${process.env.PORT}/category/${slug}`, {
		headers: {
			authtoken
		}
	});

export const updateCategory = async (slug, category, authtoken) =>
	await axios.put(`localhost:${process.env.PORT}/category/${slug}`, category, {
		headers: {
			authtoken
		}
	});

export const createCategory = async (category, authtoken) =>
	await axios.post(`localhost:${process.env.PORT}/category`, category, {
		headers: {
			authtoken
		}
	});
