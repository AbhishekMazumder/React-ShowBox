import React, { useEffect } from 'react';
import axios from 'axios';
import { Chip } from '@material-ui/core';

const Genres = ({
	selectedGenres,
	setSelectedGenres,
	genres,
	setGenres,
	type,
	setPage,
}) => {

  // select the genre
	const chosenGenre = genre => {
		setSelectedGenres([...selectedGenres, genre]);
		setGenres(genres.filter(g => g.id !== genre.id));
		setPage(1);
	};

  // clear or deselec the genre
	const clearChosenGenre = genre => {
		setSelectedGenres(
			selectedGenres.filter(selected => selected.id !== genre.id)
		);
		setGenres([...genres, genre]);
		setPage(1);
	};

	const fetchGenres = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		);
		setGenres(data.genres);
	};

	console.log(genres);

	useEffect(() => {
		fetchGenres();
		return () => {
			setGenres([]); // unmounting
		};
		// eslint-disable-next-line
	}, []);

	return (
		<div style={{ padding: "10px 6px 10px 15px" }}>
			{selectedGenres &&
				selectedGenres.map(genre => (
					<Chip
						label={genre.name}
						key={genre.id}
						style={{ margin: '3px' }}
						clickable
						size="small"
            color="primary"
            onDelete={()=>clearChosenGenre(genre)}
					/>
				))}
			{genres &&
				genres.map(genre => (
					<Chip
						label={genre.name}
						key={genre.id}
						style={{ margin: '3px' }}
						clickable
						size="small"
						onClick={() => chosenGenre(genre)}
					/>
				))}
		</div>
	);
};

export default Genres;
