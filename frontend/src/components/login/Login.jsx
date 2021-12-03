import React from 'react';
import {useHistory} from 'react-router-dom';
import ky from 'ky';
import { host } from "../../utils/rawApi";


const Login = () => {
	const history = useHistory();

	return (
		<form
			onSubmit={async (values) => {
				try {
					const response = await ky
						.post(`${host}/auth/jwt/login`, {
							body: new URLSearchParams(values), timeout: 2 * 60 * 1000,
							credentials: 'include',
						});
					if (response.ok){
						history.push('/');
						alert('ok')
					} else {
						alert('not ok')
					}
				} catch (err) {
					alert(err)
				}
			}}
		>
			<h3>Вход</h3>

			<input type="text" name="" id=""/>
			<input type="password" name="" id=""/>
			<input type="submit" value="Отправить"/>
		</form>
	);
};

export default Login;
