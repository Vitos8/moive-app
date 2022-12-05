import React, { FC, useEffect, useRef, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import "./CardPage.scss";
import { AppDispatch, RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchVideo } from "../../store/movieSclice/movieSlice";
import { useLocation } from "react-router-dom";

const Trailer: FC = () => {
     let { pathname } = useLocation();
     let video = useSelector((state: RootState) => state.movie.videos);
     const dispatch = useDispatch<AppDispatch>();

     useEffect(() => {
          dispatch(fetchVideo(+pathname.slice(7)));
     }, []);

     const opts: YouTubeProps["opts"] = {
          height: "600",
          width: "100%",
          playerVars: {
               autoplay: 2,
          },
     };

     

     return (
          <div className="videoContainer">
               {video.length > 0 && pathname && (
                    <YouTube
                         videoId={video[0]?.src.split("watch?v=")[1]}
                         opts={opts}
                    />
               )}
          </div>
     );
};

export default Trailer;
