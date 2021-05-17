import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';
import axios from 'axios';
import Genres from '../../components/Genres';
import useGenre from '../../hooks/useGenre';

const Movies = () => {
	const [genres, setGenres] = useState([]);
	const [selectedGenres, setSelectedGenres] = useState([]);
	const [page, setPage] = useState(1);
	const [content, setContent] = useState([]);
	const [numOfPages, setNumOfPages] = useState();
	const genreforURL = useGenre(selectedGenres);
	// console.log(selectedGenres);

	const fetchMovies = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
		);
		setContent(data.results);
		setNumOfPages(data.total_pages);
	};

	useEffect(() => {
		window.scroll(0, 0);
		fetchMovies();
		// eslint-disable-next-line
  }, [page,genreforURL]);
  
	return (
		<div>
			<PageTitle title="Discover Movies" />
			<Genres
				type="movie"
				selectedGenres={selectedGenres}
				setSelectedGenres={setSelectedGenres}
				genres={genres}
				setGenres={setGenres}
				setPage={setPage}
			/>
			<div className="content-wrapper">
				{content &&
					content.map(item => (
						<SingleContent
							key={item.id}
							id={item.id}
							title={item.title || item.name}
							poster={item.poster_path}
							date={item.release_date || item.first_air_date}
							media_type="movie"
							ratings={item.vote_average}
						/>
					))}
			</div>
			{numOfPages > 1 && (
				<CustomPagination setPage={setPage} numOfPages={numOfPages} />
			)}
		</div>
	);
};

export default Movies;
