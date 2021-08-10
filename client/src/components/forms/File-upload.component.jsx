import React from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Avatar } from 'antd';

const FileUpload = ({ values, setValues, setLoading }) => {
	const { user } = useSelector((state) => ({ ...state }));

	const fileUploadAndResize = (e) => {
		let files = e.target.files;
		let allUploadedFiles = values.images;

		if (files) {
			setLoading(true);
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					720,
					720,
					'JPEG',
					100,
					0,
					(uri) => {
						axios
							.post(
								`${process.env.REACT_APP_API}/uploadimage`,
								{ image: uri },
								{
									headers: {
										authtoken: user ? user.token : ''
									}
								}
							)
							.then((res) => {
								setLoading(false);
								allUploadedFiles.push(res.data);

								setValues({ ...values, images: allUploadedFiles });
							})
							.catch((err) => {
								setLoading(false);
							});
					},
					'base64'
				);
			}
		}
	};

	const handleImageRemove = (public_id) => {
		setLoading(true);
		axios
			.post(
				`${process.env.REACT_APP_API}/removeImage`,
				{ public_id },
				{
					headers: {
						authtoken: user ? user.token : ''
					}
				}
			)
			.then((res) => {
				setLoading(false);
				const { images } = values;
				let filteredImages = images.filter((item) => {
					return item.public_id !== public_id;
				});
				setValues({ ...values, images: filteredImages });
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	};

	return (
		<div>
			<div className='row'>
				{values.images &&
					values.images.map((image) => (
						<Avatar
							src={image.url}
							size={100}
							shape='square'
							className='m-1'
							onClick={() => handleImageRemove(image.public_id)}
							style={{ cursor: 'pointer' }}
						/>
					))}
			</div>
			<div className='row'>
				<label className='btn btn-primary mt-3'>
					Choose File
					<input
						type='file'
						multiple
						hidden
						accept='images/*'
						onChange={fileUploadAndResize}
					/>
				</label>
			</div>
		</div>
	);
};

export default FileUpload;
