import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import { firebaseConfig } from './firebase/config';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import { rootReducer } from './redux/rootReducer';

import './index.css';

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
