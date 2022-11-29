import React, { FC, useRef, useState } from 'react'
import "./CardPage.scss";

interface videoProps {
     src?: string
}

const Trailer: FC<videoProps> = ({src = 'https://a.storyblok.com/f/149050/x/6a37c0e94f/hs-homepage.mp4',}) => {
     const [paused, setPaused] = useState<boolean>(false)
     const videoRef = useRef<any>(null)

     let onPlayPause = () => {
          let video = videoRef.current
          if (video.paused) {
               setPaused(false)
               video.play()
          } else {
               setPaused(true)
               video.pause()
          }
     }

     return (
     <div className='videoContainer'>
          <video ref={videoRef} className='video' src={src} loop muted preload="auto" autoPlay ></video>
          {paused ? (
          <img src={require('../../assets/Play.png')} alt="Play" onClick={onPlayPause} className='pause'/>
          ) : (
          <img src={require('../../assets/Pause.png')} alt="Pause" className='pause' onClick={onPlayPause} />
          )}
     </div>
     )
     }

export default Trailer