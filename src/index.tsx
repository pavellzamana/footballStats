import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './redux/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter } from 'react-router-dom';
import * as firebase from 'firebase';

import './index.css';

const firebaseConfig = {
	apiKey: "AIzaSyANGgwIfoBjH2DjgbMKPSFSf0U5R8Qr5gw",
	authDomain: "football-stats-453ac.firebaseapp.com",
	databaseURL: "https://football-stats-453ac-default-rtdb.firebaseio.com",
	projectId: "football-stats-453ac",
	storageBucket: "football-stats-453ac.appspot.com",
	messagingSenderId: "429604380129",
	appId: "1:429604380129:web:daa65b9d01a70634bbc6a0"
};

firebase.default.initializeApp(firebaseConfig);

const middleware = [thunk];
const applied = composeWithDevTools(applyMiddleware(...middleware));
const store = createStore(rootReducer, applied);

const app = (
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
);

ReactDOM.render(
	app,
	document.getElementById('root'),
);
