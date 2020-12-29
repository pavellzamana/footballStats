import * as firebase from 'firebase';

export const registrationHandler = (userName: string, password: string) => {
	return firebase.default.auth().createUserWithEmailAndPassword(userName, password);
};

export const logInHandler = (userName: string, password: string) => {
	return firebase.default.auth().signInWithEmailAndPassword(userName, password);
};

export const logOutHandler = () => {
	return firebase.default.auth().signOut();
};