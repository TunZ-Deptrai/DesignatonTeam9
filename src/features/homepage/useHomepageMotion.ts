import { useEffect, type RefObject } from 'react'

/** Reveal each piece once per mount, without changing its layout or tab order. */
export function useHomepageMotion(rootRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current
    if (!root || !('IntersectionObserver' in window)) return

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const groups = new Map<Element, HTMLElement[]>()
    const targets: HTMLElement[] = []
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        for (const target of groups.get(entry.target) ?? []) target.dataset.homeReveal = 'visible'
        observer.unobserve(entry.target)
      }
    }, { rootMargin: '0px 0px -32px 0px', threshold: 0 })

    function register(selector: string, duration: number, stagger: number, group?: Element) {
      const elements = Array.from(root!.querySelectorAll<HTMLElement>(selector))
      elements.forEach((element, index) => {
        element.dataset.homeReveal = preference.matches ? 'visible' : 'pending'
        element.style.setProperty('--home-reveal-duration', `${duration}ms`)
        const order = group ? Math.abs(index - (elements.length - 1) / 2)
          : element.matches('.home-fit-form') ? 2
          : element.matches('.home-fit-model') ? 1 : index % 3
        element.style.setProperty('--home-reveal-delay', `${order * stagger}ms`)
        targets.push(element)
        if (!group) groups.set(element, [element])
      })
      if (group) groups.set(group, elements)
    }

    register('.home-story > :not(.home-story-background)', 650, 120)
    register('.home-fit-intro, .home-fit-steps, .home-fit-model, .home-fit-form', 550, 100)
    register('.home-featured > h2, .home-featured-description', 700, 80)
    const gallery = root.querySelector('.home-gallery-layout')
    if (gallery) register('.home-featured-photo', 700, 80, gallery)

    function showAll() {
      if (!preference.matches) return
      observer.disconnect()
      targets.forEach(target => { target.dataset.homeReveal = 'visible' })
    }

    function showFocused(event: FocusEvent) {
      if (!(event.target instanceof Element)) return
      const target = event.target.closest<HTMLElement>('[data-home-reveal]')
      if (target) {
        target.dataset.homeReveal = 'visible'
        observer.unobserve(target)
      }
    }

    if (!preference.matches) groups.forEach((_, element) => observer.observe(element))
    preference.addEventListener('change', showAll)
    root.addEventListener('focusin', showFocused)
    return () => {
      observer.disconnect()
      preference.removeEventListener('change', showAll)
      root.removeEventListener('focusin', showFocused)
      targets.forEach(target => {
        delete target.dataset.homeReveal
        target.style.removeProperty('--home-reveal-duration')
        target.style.removeProperty('--home-reveal-delay')
      })
    }
  }, [rootRef])
}
