import React, { FC, useEffect, useRef, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import "./CardPage.scss";
import { AppDispatch, RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchVideo } from "../../store/movieSclice/movieSlice";
import { useLocation } from "react-router-dom";

interface TrailerProps {
     video: any,
}

const Trailer: FC<TrailerProps> = ({video}) => {
     const [refresh, setRefresh] = useState<Boolean>(false);
     let { pathname } = useLocation();
          
     const opts: YouTubeProps["opts"] = {
               height: "600",
               width: "100%",
               controls: false,
               playerVars: {
               autoplay: 2,
          },
     }

     

     const onPlayerChange: YouTubeProps['onStateChange'] = (event) => {
          setRefresh(true)
     }

     return (
          <div className="videoContainer">
               {video.length > 0 && pathname &&  (
                    <YouTube
                         videoId={video[0]?.src}
                         opts={opts}
                         onStateChange={onPlayerChange}
                    />
               )}
          </div>
     );
};

export default Trailer;
