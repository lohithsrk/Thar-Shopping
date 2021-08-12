import axios from 'axios';

export const createOrUpdateUser = async (authtoken) => {
	return await axios.post(
		`localhost:${process.env.PORT}/create-or-update-user`,
		{},
		{
			headers: {
				authtoken
			}
		}
	);
};

export const currentUser = async (authtoken) => {
	return await axios.post(
		`localhost:${process.env.PORT}/current-user`,
		{},
		{
			headers: {
				authtoken
			}
		}
	);
};

export const currentAdmin = async (authtoken) => {
	return await axios.post(
		`localhost:${process.env.PORT}/current-admin`,
		{},
		{
			headers: {
				authtoken
			}
		}
	);
};
