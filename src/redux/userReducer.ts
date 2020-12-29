import { LOG_IN, LOG_OUT, PASSWORD_CHANGE, USERNAME_CHANGE } from './types';

const initialState: userType = {
	email: undefined,
	password: undefined,
	isAuth: false,
	loggedUser: undefined
};

export const userReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case USERNAME_CHANGE:
			return { ...state, email: action.payload };
		case PASSWORD_CHANGE:
			return { ...state, password: action.payload };
		case LOG_IN:
			return { ...state, loggedUser: action.payload, isAuth: true };
		case LOG_OUT:
			return { ...state, loggedUser: '', isAuth: false };
		default:
			return state;
	}
};

export interface userType {
	email?: string
	password?: string
	isAuth?: boolean
	loggedUser?: string
}