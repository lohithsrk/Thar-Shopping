import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getSubs } from '../../utils/sub.utils';

const SubList = () => {
	const [subs, setSubs] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		getSubs().then((res) => {
			setSubs(res.data);
			setLoading(false);
		});
	}, []);

	return (
		<div className='container'>
			<div className='row'>
				{loading ? (
					<h4 className='text-center'>Loading...</h4>
				) : (
					subs.map((sub) => (
						<Link to={`/sub/${sub.slug}`} className='col' key={sub._id}>
							<div className='btn btn-outline-primary d-block m-3'>
								{sub.name}
							</div>
						</Link>
					))
				)}
			</div>
		</div>
	);
};

export default SubList;
