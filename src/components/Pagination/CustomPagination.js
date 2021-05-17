import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const PagiTheme= createMuiTheme({
  palette:{
    type: 'dark'
  }
})

const CustomPagination = ({ setPage, numOfPages = 20 }) => {
	const handlePageChange = page => {
		setPage(page);
		window.scroll(0, 0);
	};

	return (
		<div
			style={{
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				margin: '15px 0px',
			}}
		>
			<ThemeProvider theme={PagiTheme}>
				<Pagination
					color="primary"
					count={numOfPages}
          onChange={e => handlePageChange(e.target.textContent)}
          hideNextButton
          hidePrevButton
				/>
			</ThemeProvider>
		</div>
	);
};

export default CustomPagination;
