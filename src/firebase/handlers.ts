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

export const dataPushToDatabase = async (id: string, value: string) => {
	await firebase.default.database().ref(id).push(value);
	await dataPullFromDatabase(id);
};

export const dataPullFromDatabase = (id: string) => {
	let response;
	firebase.default.database().ref(id)
		.on('value', (elem) => {
			if (elem.val()) {
				response = elem.val();
			}
		});
	return response;
};

export const dataRemoveFromDatabase = async (id: string, key: string | undefined) => {
	if (key) {
		await firebase.default.database().ref(id).child(key).remove();
	}
};