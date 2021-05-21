import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/PageTitle';
import {
	createMuiTheme,
	ThemeProvider,
	makeStyles,
} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Button } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import axios from 'axios';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';

const darkTheme = createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			main: '#fff',
		},
	},
});

const useStyles = makeStyles({
	search_Wrapper: {
		display: 'flex',
		alignItems: 'center',
		border: '2px solid grey',
		borderRadius: '6px',
		marginTop: '15px',
	},
	search_Input: {
		flex: 1,
		// padding: '10px',
		marginLeft: '15px',
		backgroundColor: 'transparent',
		border: 'none',
		color: 'white',
		fontSize: '20px',
		outline: 'none',
	},
	tab_wrapper: {
		width: '100%',
		flexGrow: 1,
		marginTop: '10px',
	},
});

const Search = () => {
	const classes = useStyles();
	const [type, setType] = useState(0);
	const [page, setPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState('');
	const [content, setContent] = useState([]);
	const [numOfPages, setNumOfPages] = useState();

	const fetchSearch = async () => {
		try {
			const { data } = await axios.get(
				`https://api.themoviedb.org/3/search/${type ? 'tv' : 'movie'}?api_key=${
					process.env.REACT_APP_API_KEY
				}&language=en-US&query=${searchTerm}&page=${page}&include_adult=false`
			);
			setContent(data.results);
			setNumOfPages(data.total_pages);
			// console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		window.scroll(0, 0);
		fetchSearch();
		// eslint-disable-next-line
	}, [type, page]);

	return (
		<div>
			<PageTitle title="Search movies and series" />
			<ThemeProvider theme={darkTheme}>
				<div className={classes.search_Wrapper}>
					<input
						type="text"
						value={searchTerm}
						placeholder="Type here to search"
						className={classes.search_Input}
						onChange={e => setSearchTerm(e.target.value)}
					/>
					<Button
						style={{ borderRadius: 0, paddingLeft: '10px' }}
						onClick={fetchSearch}
					>
						<SearchIcon fontSize="large" />
					</Button>
				</div>
				<div className={classes.tab_wrapper}>
					<Tabs
						value={type}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth"
						onChange={(event, newValue) => {
							setType(newValue);
							setPage(1);
						}}
						style={{ padding: '5px 0px' }}
					>
						<Tab label="Search Movies" style={{ width: '50%' }} />
						<Tab label="Search Series" style={{ width: '50%' }} />
					</Tabs>
				</div>
			</ThemeProvider>
		</div>
	);
};

export default Search;
