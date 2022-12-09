import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import "./Header.scss";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = ({ px }: { px: number }) => {
     const { pathname } = useLocation();
	const navigate = useNavigate();
     const [y, setY] = useState<number>(0);

     let handleNavigation = (e: any) => {
          const window = e.currentTarget;

          setY(window.scrollY);
     };

     useEffect(() => {
          window.addEventListener("scroll", (e: any) => handleNavigation(e));

          return () => {
               window.removeEventListener("scroll", (e: any) =>
                    handleNavigation(e)
               );
          };
     }, [y]);

     return (
          <div
               className="header"
               style={{
                    backgroundColor: `${y >= px ? "#545AA7" : "transparent"} `,
               }}>
               <div className="container">
                    <nav className="header__nav">
                         {pathname.includes("Movie") ? (
                              <div className="goBack" onClick={() => navigate(-1)}>
                                   <img
                                        className="goBack__img"
                                        src={require("../../assets/seeMoreArrow.png")}
                                        alt="Logo"
                                   />
                                   <div className="goBack__title">Go back</div>
                              </div>
                         ) : (
                              <img
                                   className="header__logo"
                                   src={require("../../assets/Logo.png")}
                                   alt="Logo"
                              />
                         )}
                         <div className="search">
                              <input
                                   className="search__input"
                                   type="text"
                                   placeholder="What do you want to watch?"
                              />
                              <img
                                   className="search__icon"
                                   src={require("../../assets/Search.png")}
                                   alt="search"
                              />
                         </div>
                         <Dropdown />
                    </nav>
               </div>
          </div>
     );
};

export default Header;
