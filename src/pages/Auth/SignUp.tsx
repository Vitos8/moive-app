import {useState} from 'react'
import AuthForm from '../../components/AuthForm/AuthForm'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {auth} from '../../firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'

const SignUp = () => {
	let navigate = useNavigate();

	const onError = (error:string) => toast.error(error, {
		position: "top-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true, 
		pauseOnHover: true,
		draggable: true,
		progress:'' ,
		theme: "colored",
	});

	let register = (email:string, password:string) => {
		if(email === '' || password === '') {
			return onError("Email or password isn't eneterd ");
		}

		createUserWithEmailAndPassword(auth, email, password)
		.then((res:any) => {
			navigate('/')
		})
		.catch((err:any) => {
			onError(err.message);
		}) 	
	}

	return (
	<div className='auth-bg'>
		<AuthForm label='Sign up' button='Sign up' span="Already have an account?" onSubmit={register}  />
	</div>
	)
}

export default SignUp