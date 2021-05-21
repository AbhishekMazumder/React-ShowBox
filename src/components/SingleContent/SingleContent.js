import React from 'react';
import { img_300 } from '../../config/config';
import noPoster from '../../images/no-poster.jpg';
import './singleContent.css';
import { Badge } from '@material-ui/core';
import ContentModal from '../ContentModal/ContentModal';

const SingleContent = ({ id, title, poster, date, ratings, media_type }) => {
	return (
		<ContentModal media_type={media_type} id={id}>
			<Badge badgeContent={ratings} color="primary" />
			<img
				className="poster"
				src={poster ? `${img_300}${poster}` : noPoster}
				alt={`${title} poster`}
			/>
			<b className="title">{title}</b>
			<span className="subTitle">
				{media_type === 'tv' ? 'Series' : 'Movie'}
				<spa className="subTitle">{date}</spa>
			</span>
		</ContentModal>
	);
};

export default SingleContent;
