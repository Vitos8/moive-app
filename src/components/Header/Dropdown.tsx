import React, {useState} from 'react'
import { useSelector, useDispatch 	} from 'react-redux'
//import { RootState } from "../../store/store";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from '../../firebase'
import { logout } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Dropdown = () => {
	const [activeMenu, setActiveMenu] = useState<Boolean>(false);
	const currentUser = useSelector((state: any) => state.user?.user)
	
     const [user] = useAuthState(auth);
	let navigate = useNavigate();

	let signOut = () => {
		navigate('/SignUp');
		logout();	
	}

	let onFavourites = () => {
		navigate('/Favourites');
	}
	
	return (
		<div className='action' onClick={() =>setActiveMenu(!activeMenu) }	 >
			<span>{currentUser?.name}</span>
			<div className="profile">
				<img src={`${user?.photoURL ?  user?.photoURL : 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'}`} />
			</div>
			<div className={`menu ${activeMenu ? 'active'  : ''}`} >
				<h3>{currentUser?.name}<br /><span>{currentUser?.email}</span></h3>
				<ul>
					<li>
						<img src={require('../../assets/Favourite.png')} />
						<a onClick={onFavourites}>Favourites</a>
					</li>
					<li onClick={signOut}>
						<img src={require('../../assets/LogOut.png')} />
							<a href="#" >Logout</a>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Dropdown