import React from 'react';
import { img_300 } from '../../config/config';
import noPoster from '../../images/no-poster.jpg';
import './singleContent.css';
import { Badge } from '@material-ui/core';

const SingleContent = ({ id, title, poster, date, ratings, media_type }) => {
	return (
		<div className="media">
			<Badge badgeContent={ratings} color="primary" />
			<img
				className="poster"
				src={poster ? `${img_300}${poster}` : noPoster}
				alt={`${title} poster`}
			/>
			<b className="title">{title}</b>
			<span className="subTitle">
				{media_type === 'tv' ? 'Series' : 'Movies'}
				<spa className="subTitle">{date}</spa>
			</span>
		</div>
	);
};

export default SingleContent;
