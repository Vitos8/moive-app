import React from 'react'
import "./Footer.scss";

const Footer = () => {
	return (
		<div className='footer'>
			<div className="footer__icons">
				<img src={require('../../assets/twitter.png')} alt="icon" />
				<img src={require('../../assets/youtube.png')} alt="icon" />
				<img src={require('../../assets/insta.png')} alt="icon" />
				<img src={require('../../assets/facebook.png')} alt="icon" />
			</div>
			<div className="footer__privacy">
				<span className="footer__privacy-item">Conditions of Use</span>
				<span className="footer__privacy-item">Privacy & Policy</span>
				<span className="footer__privacy-item">Press Room</span>
			</div>
			<div className="footer__info">
				<span>© 2021 MovieBox by Vitalik Golubovich</span>
			</div>
		</div>
	)
}

export default Footer