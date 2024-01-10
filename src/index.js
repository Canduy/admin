import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './reducers';
import { ToastContainer } from 'react-toastify';

// core styles
import './scss/volt.scss';

// vendor styles
import 'react-datetime/css/react-datetime.css';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import ScrollToTop from './components/ScrollToTop';
import '@fortawesome/fontawesome-free/css/all.css';

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<ToastContainer
				position='top-right'
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<ScrollToTop />
			<App />
		</BrowserRouter>
	</Provider>
	,document.getElementById('root')
);
