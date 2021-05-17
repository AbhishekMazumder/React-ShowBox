const useGenres = selectedGenres => {
	if (selectedGenres.length < 1) return '';

	const genreIds = selectedGenres.map(g => g.id);
	return genreIds.reduce((acc, cur) => acc + ',' + cur);
};

export default useGenres;