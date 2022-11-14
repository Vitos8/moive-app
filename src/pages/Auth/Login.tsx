import {useState, useEffect} from 'react'
import AuthForm from '../../components/AuthForm/AuthForm'
import { useNavigate } from 'react-router-dom'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../../firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import { onSucces, onError } from '../../utils/toasts';
import Spinner from '../../components/Spinner/Spinner'

const Login = () => {
	const [user, loading] = useAuthState(auth);
	let navigate = useNavigate();

	let SignIn = (email:string, password:string) => {
		if(email === '' || password === '') {
			return onError("Email or password isn't eneterd ");
		}
		signInWithEmailAndPassword(auth, email, password)
		.then((res:any) => {
			onSucces('You have authoried succesfully !');
			return navigate('/');
		})
		.catch((err:any) => {
			onError(err.message);
		})
	}
	
	useEffect(() => {
		if (user) {
			onSucces('You have authoried succesfully !');
			return navigate('/');
		};
	}, [user]);

	return (
		<div className='auth-bg'>
			{ !loading ? <AuthForm label='Log in' button='Log in' span="Don't have an account?" onSubmit={SignIn}  /> :  <Spinner/>}
		</div>
	)	
}		

export default Login