import { useAudio } from '../context/AudioContext'
import './RecordPlayer.css'

function RecordPlayer() {
  const { isPlaying, volume, play, pause, stop, nextTrack, prevTrack, updateVolume } = useAudio()

  const handleVolumeChange = (e) => {
    updateVolume(parseFloat(e.target.value))
  }

  return (
    <div className="record-player">
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
            <button onClick={prevTrack} className="control-btn skip-btn" aria-label="Previous Track">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
              </svg>
            </button>
            {!isPlaying ? (
              <button onClick={play} className="control-btn play-btn" aria-label="Play">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            ) : (
              <button onClick={pause} className="control-btn pause-btn" aria-label="Pause">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              </button>
            )}
            <button onClick={nextTrack} className="control-btn skip-btn" aria-label="Next Track">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
              </svg>
            </button>
            <button onClick={stop} className="control-btn stop-btn" aria-label="Stop">
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