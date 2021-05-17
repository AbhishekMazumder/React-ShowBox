import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent';
import './trending.css';
import CustomPagination from '../../components/Pagination/CustomPagination';

const Trending = () => {
	const [content, setContent] = useState([]);
	const [page, setPage] = useState(1);

	const fetchTrending = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
		);
		console.log(data);
		setContent(data.results);
	};

	useEffect(() => {
		fetchTrending();
		// eslint-disable-next-line
	}, [page]);

	

	return (
		<div>
			<PageTitle title="Trending" />
			<div className="content-wrapper">
				{content &&
					content.map(item => (
						<SingleContent
							key={item.id}
							id={item.id}
							title={item.title || item.name}
							poster={item.poster_path}
							date={item.release_date || item.first_air_date}
							media_type={item.media_type}
							ratings={item.vote_average}
						/>
					))}
			</div>
			<CustomPagination setPage={setPage} />
		</div>
	);
};

export default Trending;
