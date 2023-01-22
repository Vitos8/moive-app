import React, { useState, useEffect, useRef } from "react";
import Dropdown from "./Dropdown";
import "./Header.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchSearch } from "../../store/movieSclice/movieSlice";
import useDebounce from "../../hooks/useDebounce";


const Header = ({ px }: { px: number }) => {
     const [searchValue, setSearchValue] = useState<string>("");
     const dispatch = useDispatch<AppDispatch>();
     const inputRef = useRef<any>('');
     const searchResults = useSelector(
          (state: RootState) => state.movie.search
     );
     const debouncedValue = useDebounce<string>(searchValue, 500);
     const { pathname } = useLocation();
     const navigate = useNavigate();
     const [y, setY] = useState<number>(0);

     useEffect(() => {
          window.addEventListener("scroll", (e: any) => handleNavigation(e));

          return () => {
               window.removeEventListener("scroll", (e: any) =>
                    handleNavigation(e)
               );
          };
     }, [y]);

     useEffect(() => {
          if (debouncedValue) {
               dispatch(fetchSearch(debouncedValue));
          }
     }, [debouncedValue]);

     useEffect(() => {
          setSearchValue('');
     }, [pathname])

     let handleNavigation = (e: any) => {
          const window = e.currentTarget;
          setY(window.scrollY);
     };

     let searchMovie = (value: string) => {
          setSearchValue(value);
     };

     return (
          <div
               className="header"
               style={{
                    backgroundColor: `${y >= px ? "#BE123C" : "transparent"} `,
               }}>
               <div className="container">
                    <nav className="header__nav">
                         {pathname.includes("Movie") ? (
                              <div
                                   className="goBack"
                                   onClick={() => navigate(-1)}>
                                   <img
                                        className="goBack__img"
                                        src={require("../../assets/LeftArrow.png")}
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
                                   onBlur={( ) => true}
                                   onChange={(e: any) =>
                                        searchMovie(e.target.value)
                                   }
                              />
                              <img
                                   className="search__icon"
                                   src={require("../../assets/Search.png")}
                                   alt="search"
                              />
                              {searchValue && <div className="search__modal">
                                   <ul className="search__modal-row">
                                        {searchResults?.map((item:any) => (
                                        <li className="search__modal-item" onClick={() => navigate('/Movie/' + item.id)}>
                                             <img className="search__modal-poster" src={item.miniPoster} alt="miniPoster"/>
                                             <div className="search__modal-title">{item.title}</div>
                                        </li>
                                        ))}
                                   </ul>
                              </div>}
                         </div>
                         <Dropdown />
                    </nav>
               </div>
          </div>
     );
};

export default Header;
