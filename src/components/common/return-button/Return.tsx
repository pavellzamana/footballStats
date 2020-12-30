import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

import style from './Return.module.css';

const Return: React.FC<any> = () => {
	const history = useHistory();

	return (
		<Button className={style.button} onClick={() => history.push('/')}>
			&#60; Back to results page
		</Button>
	);
};

export default Return;