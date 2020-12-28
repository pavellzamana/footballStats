import { PASSWORD_CHANGE, USERNAME_CHANGE } from './types';

const initialState: userType = {
	email: undefined,
	password: undefined,
	isAuth: false,
};

export const userReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case USERNAME_CHANGE:
			return { ...state, email: action.payload };
		case PASSWORD_CHANGE:
			return { ...state, password: action.payload };
		default:
			return state;
	}
};

export interface userType {
	email?: string
	password?: string
	isAuth?: boolean
}