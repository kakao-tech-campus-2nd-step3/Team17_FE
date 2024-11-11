import { useCallback, useEffect, useState } from 'react'

interface UseIntersectionObserverProps {
  threshold?: number
  onChange: () => void
}

const useIntersectionObserver = ({
  threshold = 0.1,
  onChange,
}: UseIntersectionObserverProps) => {
  const [target, setTarget] = useState<HTMLDivElement | null | undefined>(null)

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onChange()
        }
      })
    },
    [onChange]
  )

  useEffect(() => {
    if (!target) return undefined

    const observer = new IntersectionObserver(observerCallback, {
      threshold,
    })

    observer.observe(target)

    return () => {
      if (target) {
        observer.unobserve(target)
      }
    }
  }, [observerCallback, threshold, target])

  return { setTarget }
}

export default useIntersectionObserver
