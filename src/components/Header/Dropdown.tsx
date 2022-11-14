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
	
	return (
		<div className='action' onClick={() =>setActiveMenu(!activeMenu) }	 >
			<span>{currentUser?.name}</span>
			<div className="profile">
				<img src={`${user?.photoURL ?  user?.photoURL : 'Profile.png'}`} />
			</div>
			<div className={`menu ${activeMenu ? 'active'  : ''}`}>
				<h3>{currentUser?.name}<br /><span>{currentUser?.email}</span></h3>
				<ul>
					<li>
						<img src="Favourite.png" />
						<a href="#">Favourites</a>
					</li>
					<li onClick={signOut}>
						<img src="LogOut.png" />
							<a href="#" >Logout</a>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Dropdown