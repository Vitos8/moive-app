import {useState, FC, useRef} from 'react'
import "./AuthForm.scss";
import { useNavigate } from 'react-router-dom'

interface authFormProps {
    label:string
    button: string
    span: string
    onSubmit: (email: string, password: string, name?: string) => void
}

const AuthForm:FC<authFormProps> = ({label, button, span, onSubmit}) => {
    const [passwordVisibility, setPasswordVisibility]  = useState<Boolean>(false);
    let emailRef = useRef<any>();
    let passwordRef = useRef<any>();
    let nameRef = useRef<any>();
	let navigate = useNavigate();
    let redicrect = label === 'Sign up' ? '/Login' : '/SignUp';

    let onSubmitAuthForm = (e:any) => {
        e.preventDefault();
        onSubmit(emailRef.current?.value, passwordRef.current?.value, nameRef.current?.value );
    }

    return (
        <div className='auth'>
            <div className="auth__overlay">
                <form className='auth-form' onSubmit={(e: any) => onSubmitAuthForm(e)}>
                    <label className='auth-form__label'>{label}</label>
                    {label === 'Sign up' && <div className="auth-form__input-row">
                        <input ref={nameRef} placeholder='Name' className='auth-form__input' />
                        <img className='auth-form__input-img' src='Auth-input-person.svg' />
                    </div>}
                    <div className="auth-form__input-row">
                        <input ref={emailRef} placeholder='Email' className='auth-form__input' />
                        <img className='auth-form__input-img' src='Auth-input-person.svg' />
                    </div>
                    <div className="auth-form__input-row">
                        <input ref={passwordRef} placeholder='Password' className='auth-form__input'  type={`${passwordVisibility ? "text" : "password"}`} />
                        <img className='auth-form__input-img'  src='Auth-input-check.png' onClick={() => setPasswordVisibility(!passwordVisibility)}/>
                    </div>
                    <button className='auth-form__button' type='submit'>{button}</button>
                    <span className='auth-form__span'>{span} <i className='' onClick={() => navigate(redicrect)}>{ label === 'Sign up' ? 'Log in!' : 'Sign up!'}</i></span>
                </form>
            </div>
        </div>
    )
}

export default AuthForm;