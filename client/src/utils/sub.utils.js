import axios from 'axios';

export const getSubs = async () =>
	await axios.get(`localhost:${process.env.PORT}/subs`);

export const getSub = async (slug) =>
	await axios.get(`localhost:${process.env.PORT}/sub/${slug}`);

export const removeSub = async (slug, authtoken) =>
	await axios.delete(`localhost:${process.env.PORT}/sub/${slug}`, {
		headers: {
			authtoken
		}
	});

export const updateSub = async (slug, sub, authtoken) =>
	await axios.put(`localhost:${process.env.PORT}/sub/${slug}`, sub, {
		headers: {
			authtoken
		}
	});

export const createSub = async (sub, authtoken) =>
	await axios.post(`localhost:${process.env.PORT}/sub`, sub, {
		headers: {
			authtoken
		}
	});

export const getCategorySubs = async (_id) =>
	await axios.get(`localhost:${process.env.PORT}/category/subs/${_id}`);
