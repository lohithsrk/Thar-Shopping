import React from 'react';
import StarRating from 'react-star-ratings';

const Star = ({ starClick, numberOfStars }) => (
	<div>
		<StarRating
			changeRating={() => starClick(numberOfStars)}
			numberOfStars={numberOfStars}
			starDimension='20px'
			starSpacing='2px'
			starHoverColor='red'
			starEmptyColor='red'
		/>
		<br />
	</div>
);

export default Star;
