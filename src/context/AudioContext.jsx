import { createContext, useContext, useState, useRef, useEffect } from 'react'

const AudioContext = createContext()

const tracks = [
  '/assets/audio/sheep-tune-1.mp3',
  '/assets/audio/sheep-tune-2.mp3',
  '/assets/audio/sheep-tune-3.mp3',
  '/assets/audio/sheep-tune-4.mp3',
  '/assets/audio/sheep-tune-5.mp3',
]

export function AudioProvider({ children }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [currentTrack, setCurrentTrack] = useState(0)

  useEffect(() => {
    const audio = new Audio(tracks[currentTrack])
    audio.volume = volume
    audioRef.current = audio

    const handleEnded = () => {
      // Auto-advance to next track
      const nextTrack = (currentTrack + 1) % tracks.length
      setCurrentTrack(nextTrack)
    }

    audio.addEventListener('ended', handleEnded)

    // If we were playing, continue playing the new track
    if (isPlaying) {
      audio.play().catch(err => console.error('Play error:', err))
    }

    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.pause()
      audio.src = ''
    }
  }, [currentTrack])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error('Play error:', err))
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)
  }

  const updateVolume = (newVolume) => {
    setVolume(newVolume)
  }

  return (
    <AudioContext.Provider value={{ 
      isPlaying, 
      volume, 
      currentTrack,
      totalTracks: tracks.length,
      play, 
      pause, 
      stop, 
      nextTrack,
      prevTrack,
      updateVolume 
    }}>
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}