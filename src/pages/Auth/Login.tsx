import {useState} from 'react'
import AuthForm from '../../components/AuthForm/AuthForm'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../../firebase'


const Login = () => {
	const [error, setError] = useState<String>('Invalid email or password');
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

	let SignIn = (email:string, password:string) => {
		if(email === '' || password === '') {
			return onError("Email or password isn't eneterd ");
		}

		signInWithEmailAndPassword(auth, email, password)
		.then((res:any) => {
			navigate('/')
		})
		.catch((err:any) => {
			onError(err.message);
		})

	}

	return (
		<div className='auth-bg'>
			<AuthForm label='Log in' button='Log in' span="Don't have an account?" onSubmit={SignIn}  />
		</div>
	)	
}		

export default Login