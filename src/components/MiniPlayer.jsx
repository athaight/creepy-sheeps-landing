import { useState } from 'react'
import { useAudio } from '../context/AudioContext'
import './MiniPlayer.css'

function MiniPlayer() {
  const { isPlaying, volume, play, pause, nextTrack, prevTrack, updateVolume } = useAudio()
  const [isExpanded, setIsExpanded] = useState(false)

  const handlePlayPause = () => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }

  const handleVolumeChange = (e) => {
    updateVolume(parseFloat(e.target.value))
  }

  return (
    <div 
      className={`mini-player ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="mini-player-controls">
        <button 
          className="mini-player-btn mini-skip-btn" 
          onClick={prevTrack}
          aria-label="Previous Track"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
          </svg>
        </button>
        
        <button 
          className="mini-player-btn" 
          onClick={handlePlayPause}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
        
        <button 
          className="mini-player-btn mini-skip-btn" 
          onClick={nextTrack}
          aria-label="Next Track"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
          </svg>
        </button>
      </div>
      
      <div className="mini-player-volume">
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
          className="mini-volume-slider"
          aria-label="Volume"
        />
      </div>
    </div>
  )
}

export default MiniPlayer