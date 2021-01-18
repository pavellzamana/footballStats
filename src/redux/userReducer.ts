import { GET_FAVOURITES, LOG_IN, LOG_OUT, PASSWORD_CHANGE, USERNAME_CHANGE } from './types';
import { IFavouritesObject } from '../api/types/type';
import { AnyAction } from 'redux';

const initialState: userType = {
	email: undefined,
	password: undefined,
	isAuth: false,
	loggedUser: undefined,
	userID: undefined,
	favourites: undefined
};

export const userReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case USERNAME_CHANGE:
			return { ...state, email: action.payload };
		case PASSWORD_CHANGE:
			return { ...state, password: action.payload };
		case LOG_IN:
			return { ...state, loggedUser: action.payload, isAuth: true, userID: action.uId};
		case LOG_OUT:
			return { ...state, loggedUser: '', isAuth: false, userID: undefined};
		case GET_FAVOURITES:
			return {...state, favourites: (action.favourites)};
		default:
			return state;
	}
};

export interface userType {
	email?: string
	password?: string
	isAuth: boolean
	loggedUser?: string
	userID?: string
	favourites?: IFavouritesObject[]
}