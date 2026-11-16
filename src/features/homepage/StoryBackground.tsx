import { useEffect, useRef, useState } from 'react'
import { homeAssets } from './assets'

export function StoryBackground({ paused }: { paused: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video || failed) return

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let inView = false
    let disposed = false
    const shouldPlay = () => !disposed && inView && !paused && !preference.matches && !document.hidden

    function syncPlayback() {
      if (shouldPlay()) {
        video!.play().then(() => {
          // A scroll or preference change can happen while playback starts.
          if (!shouldPlay()) video!.pause()
        }).catch(() => { /* The poster remains visible if autoplay is unavailable. */ })
      } else {
        video!.pause()
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      syncPlayback()
    })
    observer.observe(video)
    preference.addEventListener('change', syncPlayback)
    document.addEventListener('visibilitychange', syncPlayback)
    return () => {
      disposed = true
      observer.disconnect()
      preference.removeEventListener('change', syncPlayback)
      document.removeEventListener('visibilitychange', syncPlayback)
      video.pause()
    }
  }, [paused, failed])

  return <div className="home-story-background" aria-hidden="true">
    <img src={homeAssets.storyBackground} alt="" loading="lazy" />
    <video ref={videoRef} src={homeAssets.storyVideo} poster={homeAssets.storyBackground} muted loop playsInline preload="none" hidden={failed} onError={() => setFailed(true)} />
  </div>
}
