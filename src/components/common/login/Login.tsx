import React, { useEffect, useState } from 'react';
import { Form, Input, Button, TreeSelect } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { changeLoginData, changePasswordData, logIn, logOut, pullFavourites } from '../../../redux/actions';
import { NavLink } from 'react-router-dom';
import { AppStateType } from '../../../redux/rootReducer';
import { logInHandler, logOutHandler } from '../../../firebase/handlers';
import { ISeasons } from '../types/Type';

import style from './Login.module.css';

const { TreeNode } = TreeSelect;

const Login: React.FC = () => {
	const userName = useSelector<AppStateType, string>(state => state.user.email);
	const password = useSelector<AppStateType, string>(state => state.user.password);
	const isAuth = useSelector<AppStateType, boolean | undefined>(state => state.user.isAuth);
	const currentUser = useSelector<AppStateType, string>(state => state.user.loggedUser);
	const userID = useSelector<AppStateType, string>(state => state.user.userID);
	const favourites = Object.values(useSelector((state: AppStateType) => state.user.favourites));

	const dispatch = useDispatch();
	const logInAction = () => {
		logInHandler(userName, password)
			.then(response => {

				dispatch(logIn(response.user!.email!, response.user!.uid));
			})
			.catch(error => alert(error.message));
	};
	const logOutAction = () => {
		logOutHandler().then(() => dispatch(logOut()));
	};
	// @ts-ignore
	useEffect(() => dispatch(pullFavourites(userID)), [userID]);

	return (
		(!isAuth) ?
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
						<Button type='primary' htmlType='submit' className={style.submit} onClick={logInAction}>
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
			:
			<>
			<div className={style.welcome}>Welcome {currentUser}
				<Form.Item>
					<Button type='primary' htmlType='submit' className={style.submit} onClick={logOutAction}>
						Log Out
					</Button>
				</Form.Item>
			</div>
				<TreeSelect
					className={style.selector}
					placeholder='Favourite Teams'
					treeDefaultExpandAll
				>
					<TreeNode value='parent 1-0' title='Favourite Teams' disabled>
						{favourites
							.map((item) =>
								<TreeNode value={'ttt'}
										  title={item}
								/>,
							)
						}
					</TreeNode>
				</TreeSelect>
				</>
	);
};


export default Login;