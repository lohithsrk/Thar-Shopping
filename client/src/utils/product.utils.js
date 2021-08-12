import axios from 'axios';

export const createProduct = async (product, authtoken) =>
	await axios.post(`localhost:${process.env.PORT}/product`, product, {
		headers: {
			authtoken
		}
	});

export const updateProduct = async (slug, product, authtoken) =>
	await axios.put(`localhost:${process.env.PORT}/product/${slug}`, product, {
		headers: {
			authtoken
		}
	});

export const getProductsByCount = async (count) =>
	await axios.get(`localhost:${process.env.PORT}/products/${count}`);

export const getProduct = async (slug) =>
	await axios.get(`localhost:${process.env.PORT}/product/${slug}`);

export const getProductsCount = async () =>
	await axios.get(`localhost:${process.env.PORT}/products/total`);

export const getProducts = async (sort, order, page) =>
	await axios.post(`localhost:${process.env.PORT}/products`, {
		sort,
		order,
		page
	});

export const removeProduct = async (slug, authtoken) =>
	await axios.delete(`localhost:${process.env.PORT}/product/${slug}`, {
		headers: { authtoken: authtoken }
	});

export const productStar = async (productId, star, authtoken) =>
	await axios.put(
		`localhost:${process.env.PORT}/product/star/${productId}`,
		{ star },
		{
			headers: { authtoken: authtoken }
		}
	);

export const getRelated = async (productId) =>
	await axios.get(`localhost:${process.env.PORT}/product/related/${productId}`);

export const fetchProductsByFilter = async (arg) =>
	await axios.post(`localhost:${process.env.PORT}/search/filters`, arg);
