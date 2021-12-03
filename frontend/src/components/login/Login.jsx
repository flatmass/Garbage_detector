import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ky from 'ky';
import { host } from "../../utils/rawApi";
import { useAuth } from "../../utils/authContext";


const Login = () => {
	const history = useHistory();
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	let auth = useAuth();


	return (
		<form>
			<h3>Вход</h3>
			<input type="text" name="" onChange={(e) => {setLogin(e.target.value); console.log(e.target.value)}} id=""/>
			<input type="password" name="" onChange={(e) => {setPassword(e.target.value); console.log(e.target.value)}} id=""/>
			<a href="#"  onClick={(e) => {
				e.preventDefault();
				auth.signIn(login, password)
			}}>
				Отправить
			</a>
		</form>
	);
};

export default Login;
