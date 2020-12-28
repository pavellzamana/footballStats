import React from 'react';
import { Form, Input, Button } from 'antd';
import * as firebase from 'firebase';

import style from './Login.module.css';

const Login: React.FC = () => {
	const db = firebase.default.database();
	console.log(db);
	const onFinish = () => {
		console.log('Success');
	};

	const onFinishFailed = () => {
		console.log('Failed');
	};
	return (
		<div className={style.login}>
			<Form
				layout='inline'
				name='basic'
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item
					className={style.input}
					name='username'
					rules={[
						{
							required: true,
							message: 'Please enter e-mail',
						},
					]}
				>
					<Input placeholder='E-mail' />
				</Form.Item>

				<Form.Item
					name='password'
					rules={[
						{
							required: true,
							message: 'Please enter password',
						},
					]}
				>
					<Input.Password placeholder='Password' />
				</Form.Item>

				<Form.Item>
					<Button type='primary' htmlType='submit' className={style.submit}>
						Log In
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};


export default Login;