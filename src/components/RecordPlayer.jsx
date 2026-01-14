import { useState, useRef, useEffect } from 'react'
import './RecordPlayer.css'

function RecordPlayer() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
  }

  return (
    <div className="record-player">
      <audio ref={audioRef} src="/assets/audio/sheep-tune-1.mp3" loop />
      
      <div className="player-container">
        <div className="player-top">
          <div className="turntable">
            <div className={`platter ${isPlaying ? 'spinning' : ''}`}>
              <div className="vinyl">
                <div className="vinyl-grooves"></div>
                <div className="vinyl-label">
                  <span className="label-text">CS</span>
                </div>
              </div>
            </div>
            <div className="spindle"></div>
            
            <div className={`tonearm ${isPlaying ? 'playing' : ''}`}>
              <div className="tonearm-base"></div>
              <div className="tonearm-arm"></div>
              <div className="tonearm-head"></div>
            </div>
          </div>

          <div className="control-buttons">
            {!isPlaying ? (
              <button onClick={handlePlay} className="control-btn play-btn" aria-label="Play">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            ) : (
              <button onClick={handlePause} className="control-btn pause-btn" aria-label="Pause">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              </button>
            )}
            <button onClick={handleStop} className="control-btn stop-btn" aria-label="Stop">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h12v12H6z"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="volume-control">
          <svg className="volume-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  )
}

export default RecordPlayer