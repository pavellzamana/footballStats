import React from 'react';
import { Form, Input, Button } from 'antd';
import * as firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';

import style from './Login.module.css';
import { changeLoginData, changePasswordData, logIn, logOut } from '../../../redux/actions';
import { NavLink } from 'react-router-dom';
import { AppStateType } from '../../../redux/rootReducer';

const Login: React.FC = () => {
	const userName = useSelector<AppStateType, string>(state => state.user.email);
	const password = useSelector<AppStateType, string>(state => state.user.password);
	const isAuth = useSelector<AppStateType, boolean | undefined>(state => state.user.isAuth);
	const currentUser = useSelector<AppStateType, string>(state => state.user.loggedUser);
	const dispatch = useDispatch();
	const logInHandler = () => {
		firebase.default.auth().signInWithEmailAndPassword(userName, password)
			.then(response => dispatch(logIn(response.user!.email!)))
			.catch(error => alert(error.message));
	};
	const logOutHandler = () => {
		firebase.default.auth().signOut()
			.then(() => dispatch(logOut()));
	};

	return (
		<>
			{!isAuth ?
				<div className={style.login}>
					<Form
						layout='inline'
						name='basic'
						initialValues={{
							remember: true,
						}}
					>
						<Form.Item
							className={style.input}
							name='username'
							rules={[{ required: true, message: 'Please enter e-mail' }]}
						>
							<Input placeholder='E-mail'
								   onChange={(e) => dispatch(changeLoginData(e.target.value))}
							/>
						</Form.Item>

						<Form.Item
							name='password'
							rules={[{ required: true, message: 'Please enter password' }]}
							className={style.password}
						>
							<Input.Password placeholder='Password'
											onChange={(e) => dispatch(changePasswordData(e.target.value))}
							/>
						</Form.Item>

						<Form.Item>
							<Button type='primary' htmlType='submit' className={style.submit} onClick={logInHandler}>
								Log In
							</Button>
						</Form.Item>

						<Form.Item>
							<NavLink to={'/registration'}>
								<Button type='primary' htmlType='submit' className={style.submit}>
									Create Account
								</Button>
							</NavLink>
						</Form.Item>
					</Form>
				</div>
				: <div className={style.welcome}>Welcome {currentUser}
					<Form.Item>
						<Button type='primary' htmlType='submit' className={style.submit} onClick={logOutHandler}>
							Log Out
						</Button>
					</Form.Item>
				</div>
			}
		</>
	);
};


export default Login;