import React, {useState, useEffect} from 'react'
import Dropdown from './Dropdown';
import "./Header.scss";

const Header = () => {
	const [y, setY] = useState<number>(0);
	
	let handleNavigation = (e:any) => {
		const window = e.currentTarget;

		setY(window.scrollY)
	}
	
	useEffect(() => {
		window.addEventListener('scroll', (e:any) => handleNavigation(e));

		return () => {
			window.removeEventListener('scroll', (e:any) => handleNavigation(e))
		}
	},[y])

	return (
		<div className='header' style={{backgroundColor: `${y > 100	 ? '#545AA7' :  'transparent'} `}}>
			<div className="container">
				<nav className="header__nav">
					<img className='header__logo' src="Logo.png" alt="Logo" />
					<div className="search">
						<input className='search__input'  type="text" placeholder='What do you want to watch?' />
						<img  className='search__icon' src="Search.png" alt="search" />
					</div>
					<Dropdown  />
				</nav>
			</div>
		</div>
	)
}

export default Header