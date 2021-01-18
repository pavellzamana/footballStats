import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Form, Input, Layout } from 'antd';
import { NavLink, useHistory } from 'react-router-dom';
import Return from '../return-button/Return';
import { changeLoginData, changePasswordData } from '../../../redux/actions';
import { AppStateType } from '../../../redux/rootReducer';
import { registrationHandler } from '../../../firebase/handlers';

import style from './Registration.module.css';

const { Header } = Layout;

const Registration = () => {
	const userName = useSelector<AppStateType, string>(state => state.user.email);
	const password = useSelector<AppStateType, string>(state => state.user.password);
	const dispatch = useDispatch();
	const [serverMessage, setServerMessage] = useState('');
	const history = useHistory();

	const setMessage: (arg: string) => void = (response) => {
		setServerMessage(response);
		setInterval(() => setServerMessage(''), 5000);
	};
	const register = () => {
		registrationHandler(userName, password)
			.then(() => {
				setMessage('Account Created. Please wait, you will be redirected to main page');
				setTimeout(() => history.push('/'), 5000);
			})
			.catch(error => setMessage(error.message));
	};

	return (
		<div className={style.container}>
			<Header className={style.head}>
				<Return />
			</Header>
			<Card title='Registration' className={style.register}>
				<Form
					layout='vertical'
					name='basic'
					initialValues={{
						remember: true,
					}}
				>
					<Form.Item
						name='username'
						rules={[{ required: true, message: 'Please enter e-mail' }]}
					>
						<Input placeholder='E-mail'
							   onChange={(e) => dispatch(changeLoginData(e.target.value))}
						/>
					</Form.Item>

					<Form.Item
						name='password' rules={[{ required: true, message: 'Please enter password' }]}
					>
						<Input.Password placeholder='Password'
										onChange={(e) => dispatch(changePasswordData(e.target.value))}
						/>
					</Form.Item>

					<div>{serverMessage}</div>

					<Form.Item>
						<NavLink to={'/registration'}>
							<Button type='primary' htmlType='submit' className={style.submit} onClick={register}>
								Create Account
							</Button>
						</NavLink>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};

export default Registration;