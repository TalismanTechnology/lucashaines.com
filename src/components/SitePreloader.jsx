import { useEffect, useState } from 'react'
import { GALLERY_ITEMS } from '../data/gallery'
import { VIDEO_URLS } from './VideoBackground'

const MIN_DISPLAY_MS = 1400
const MAX_WAIT_MS = 7000

let assetPreloadPromise

const preloadImage = (src) =>
  new Promise((resolve) => {
    const image = new Image()
    image.onload = image.onerror = resolve
    image.src = src
  })

const preloadVideo = (src) =>
  new Promise((resolve) => {
    const video = document.createElement('video')
    const finish = () => {
      video.removeEventListener('loadeddata', finish)
      video.removeEventListener('error', finish)
      resolve()
    }

    video.preload = 'auto'
    video.muted = true
    video.playsInline = true
    video.addEventListener('loadeddata', finish, { once: true })
    video.addEventListener('error', finish, { once: true })
    video.src = src
    video.load()
  })

const preloadSiteAssets = () => {
  if (!assetPreloadPromise) {
    const thumbnailLoads = GALLERY_ITEMS.map((photo) =>
      preloadImage(`/gallery/thumbs/${photo.file}`),
    )

    assetPreloadPromise = Promise.allSettled([
      preloadVideo(VIDEO_URLS[0]),
      ...thumbnailLoads,
    ])
  }

  return assetPreloadPromise
}

export default function SitePreloader({ children }) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    let active = true
    let revealTimer
    let timeoutTimer
    const startedAt = performance.now()

    const timeout = new Promise((resolve) => {
      timeoutTimer = window.setTimeout(resolve, MAX_WAIT_MS)
    })

    Promise.race([preloadSiteAssets(), timeout]).then(() => {
      if (!active) return
      const remaining = Math.max(0, MIN_DISPLAY_MS - (performance.now() - startedAt))
      revealTimer = window.setTimeout(() => {
        if (active) setIsReady(true)
      }, remaining)
    })

    return () => {
      active = false
      window.clearTimeout(revealTimer)
      window.clearTimeout(timeoutTimer)
    }
  }, [])

  if (!isReady) {
    return (
      <div className="site-preloader" role="status" aria-live="polite" aria-label="Loading site">
        <div className="site-preloader__mark" aria-hidden="true">Lucas.</div>
        <div className="site-preloader__track" aria-hidden="true">
          <span className="site-preloader__bar" />
        </div>
        <span className="site-preloader__label">Loading</span>
      </div>
    )
  }

  return children
}
