import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'

import './Masonry.css'

const COLUMN_QUERIES = [
  '(min-width: 1500px)',
  '(min-width: 1000px)',
  '(min-width: 600px)',
  '(min-width: 400px)',
]
const COLUMN_VALUES = [5, 4, 3, 2]

const useMedia = (queries, values, defaultValue) => {
  const get = () => values[queries.findIndex((query) => matchMedia(query).matches)] ?? defaultValue
  const [value, setValue] = useState(get)

  useEffect(() => {
    const handler = () => setValue(get())
    const mediaQueries = queries.map((query) => matchMedia(query))
    mediaQueries.forEach((query) => query.addEventListener('change', handler))
    return () => mediaQueries.forEach((query) => query.removeEventListener('change', handler))
  }, [queries, values, defaultValue])

  return value
}

const useMeasure = () => {
  const ref = useRef(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    if (!ref.current) return undefined
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return [ref, size]
}

const preloadImages = async (urls) => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise((resolve) => {
          const image = new Image()
          image.src = src
          image.onload = image.onerror = resolve
        }),
    ),
  )
}

export default function Masonry({
  items,
  onItemClick,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.025,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.98,
  blurToFocus = true,
}) {
  const columns = useMedia(COLUMN_QUERIES, COLUMN_VALUES, 1)
  const [containerRef, { width }] = useMeasure()
  const [imagesReady, setImagesReady] = useState(false)
  const hasMounted = useRef(false)

  useEffect(() => {
    let active = true
    setImagesReady(false)
    preloadImages(items.map((item) => item.img)).then(() => {
      if (active) setImagesReady(true)
    })
    return () => {
      active = false
    }
  }, [items])

  const { grid, height } = useMemo(() => {
    if (!width) return { grid: [], height: 0 }

    const columnHeights = new Array(columns).fill(0)
    const columnWidth = width / columns
    const layout = items.map((child) => {
      const column = columnHeights.indexOf(Math.min(...columnHeights))
      const x = columnWidth * column
      const itemHeight = columnWidth * child.aspectRatio
      const y = columnHeights[column]

      columnHeights[column] += itemHeight
      return { ...child, x, y, w: columnWidth, h: itemHeight }
    })

    return { grid: layout, height: Math.max(...columnHeights) }
  }, [columns, items, width])

  const getInitialPosition = (item) => {
    const containerRect = containerRef.current?.getBoundingClientRect()
    if (!containerRect) return { x: item.x, y: item.y }

    switch (animateFrom) {
      case 'top':
        return { x: item.x, y: -200 }
      case 'left':
        return { x: -200, y: item.y }
      case 'right':
        return { x: window.innerWidth + 200, y: item.y }
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        }
      case 'bottom':
      default:
        return { x: item.x, y: window.innerHeight + 120 }
    }
  }

  useLayoutEffect(() => {
    if (!imagesReady) return undefined

    grid.forEach((item, index) => {
      const selector = `[data-masonry-key="${item.id}"]`
      const animationProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h,
      }

      if (!hasMounted.current) {
        const initialPosition = getInitialPosition(item)
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: initialPosition.x,
            y: initialPosition.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: 'blur(10px)' }),
          },
          {
            opacity: 1,
            ...animationProps,
            ...(blurToFocus && { filter: 'blur(0px)' }),
            duration: 0.8,
            ease: 'power3.out',
            delay: index * stagger,
          },
        )
      } else {
        gsap.to(selector, {
          ...animationProps,
          duration,
          ease,
          overwrite: 'auto',
        })
      }
    })

    hasMounted.current = true
    return () => {
      grid.forEach((item) => gsap.killTweensOf(`[data-masonry-key="${item.id}"]`))
    }
  }, [animateFrom, blurToFocus, duration, ease, grid, imagesReady, stagger])

  const animateScale = (item, scale) => {
    if (!scaleOnHover) return
    gsap.to(`[data-masonry-key="${item.id}"]`, {
      scale,
      duration: 0.28,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  return (
    <div ref={containerRef} className="masonry-list" style={{ height }}>
      {grid.map((item) => (
        <button
          key={item.id}
          type="button"
          data-masonry-key={item.id}
          className="masonry-item-wrapper"
          aria-label={item.label}
          onClick={() => onItemClick?.(item)}
          onMouseEnter={() => animateScale(item, hoverScale)}
          onMouseLeave={() => animateScale(item, 1)}
          onFocus={() => animateScale(item, hoverScale)}
          onBlur={() => animateScale(item, 1)}
        >
          <span className="masonry-item-img" style={{ backgroundImage: `url(${item.img})` }} />
        </button>
      ))}
    </div>
  )
}
