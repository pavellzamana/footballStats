import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Card, Form, Input, Layout } from 'antd';
import Return from '../common/Return-button/Return';
import { logIn } from '../../redux/actions';
import { logInHandler, registrationHandler } from '../../firebase/handlers';

import style from './Registration.module.css';

const { Header } = Layout;

const Registration = () => {
	const [serverMessage, setServerMessage] = useState('');
	const history = useHistory();
	const dispatch = useDispatch();
	const setMessage: (arg: string) => void = (response) => {
		setServerMessage(response);
		setInterval(() => setServerMessage(''), 5000);
	};
	const registerHandle = () => {
		const email = form.getFieldValue('email');
		const password = form.getFieldValue('password');
		registrationHandler(email, password)
			.then(() => {
				setMessage('Account Created. Please wait, you will be redirected to main page');
				logInHandler(email, password)
					.then(response => {
						if (!response || !response.user || !response.user.email || !response.user.uid) return;
						dispatch(logIn(response.user.email, response.user.uid));
						history.push('/');
					});
			})
			.catch(error => setMessage(error.message));
	};
	const [form] = Form.useForm();
	const requireInputData = {
		requireEmail: [{ required: true, message: 'Please enter e-mail' }],
		requirePassword: [{ required: true, message: 'Please enter password' }]
	};

	return (
		<div className={style.container}>
			<Header className={style.head}>
				<Return />
			</Header>
			<Card title='Registration' className={style.register}>
				<Form layout='vertical'	name='basic' form={form}>
					<Form.Item name='email'	rules={requireInputData.requireEmail}>
						<Input placeholder='E-mail'	/>
					</Form.Item>

					<Form.Item name='password' rules={requireInputData.requirePassword}>
						<Input.Password placeholder='Password' />
					</Form.Item>

					<div>{serverMessage}</div>

					<Form.Item>
						<Button type='primary' htmlType='submit' className={style.submit} onClick={registerHandle}>
							Create Account
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};

export default Registration;