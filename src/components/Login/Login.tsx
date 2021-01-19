import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';
import { logIn, logOut, pullFavourites } from '../../redux/actions';
import { logInHandler, logOutHandler } from '../../firebase/handlers';
import { AppStateType } from '../../redux/rootReducer';
import { IFavourites, IFavouritesObject } from '../../api/types/type';

import style from './Login.module.css';

const Login: React.FC = () => {
	const isAuth = useSelector<AppStateType, boolean | undefined>(state => state.user.isAuth);
	const currentUser = useSelector<AppStateType, string>(state => state.user.loggedUser);
	const userID = useSelector<AppStateType, string>(state => state.user.userID);
	const favourites = useSelector<AppStateType, IFavouritesObject>
	((state: AppStateType) => state.user.favourites);
	const [form] = Form.useForm();
	const favouritesArray: IFavourites[] = [];
	const history = useHistory();
	if (favourites) {
		favouritesArray.push(...Object.values(favourites));
	}
	const openNotification: (arg: string) => void = (message) => {
		notification.open({
			duration: 6,
			message: 'Something went wrong',
			description: message,
		});
	};
	const dispatch = useDispatch();
	const logInAction = () => {
		const email = form.getFieldValue('email');
		const password = form.getFieldValue('password');
		logInHandler(email, password)
			.then(response => {
				if (!response || !response.user || !response.user.email || !response.user.uid) return;
				dispatch(logIn(response.user.email, response.user.uid));
			})
			.catch(error => openNotification(error.message));
	};
	const logOutAction = () => {
		logOutHandler().then(() => dispatch(logOut()));
	};
	useEffect(() => {
		dispatch(pullFavourites(userID));
	}, [userID]);
	const requireInputData = {
		requireEmail: [{ required: true, message: 'Please enter e-mail' }],
		requirePassword: [{ required: true, message: 'Please enter password' }]
	};

	return (!isAuth ?
		(
			<div className={style.login}>
				<Form layout='inline' name='basic' form={form}>
					<Form.Item className={style.input} name='email'	rules={requireInputData.requireEmail}>
						<Input placeholder='E-mail'	/>
					</Form.Item>

					<Form.Item name='password' rules={requireInputData.requirePassword}	className={style.password}>
						<Input.Password placeholder='Password' />
					</Form.Item>

					<Form.Item>
						<Button type='primary' htmlType='submit' className={style.submit} onClick={logInAction}>
							Log In
						</Button>
					</Form.Item>

					<Form.Item>
						<Button type='primary' htmlType='submit' className={style.submit}
								onClick={() => history.push('/Registration')}>
							Create Account
						</Button>
					</Form.Item>
				</Form>
			</div>)
		:
		(<>
			<div className={style.welcome}>Welcome {currentUser}
				<Form.Item>
					<Button type='primary' htmlType='submit' className={style.submit} onClick={logOutAction}>
						Log Out
					</Button>
				</Form.Item>
			</div>
			<div className={style.container}>
				{favouritesArray.map((item, i) =>
					<img src={item.logo} className={style.logo} alt={item.teamName} key={i}
						 onClick={() => history.push('/team/' + item.team_id)} />)
				}
			</div>
		</>)
	);
};

export default Login;