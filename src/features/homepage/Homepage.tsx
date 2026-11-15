import { useEffect, useId, useRef, useState, type CSSProperties, type FormEvent } from 'react'
import { Button } from '../../components/ui/Button'
import { CheckoutHeader } from '../checkout/components/CheckoutHeader'
import { CheckoutFooter } from '../checkout/components/CheckoutFooter'
import { FitFinderDialog } from '../shirts/FitFinderDialog'
import { skinTones } from '../shirts/assets'
import { sampleMeasurements, type FitProfile } from '../shirts/data'
import { featuredPhotos, homeAssets } from './assets'
import { useHomepageMotion } from './useHomepageMotion'
import '../checkout/styles/cart.css'
import '../checkout/styles/shipping.css'
import '../shirts/shirts.css'
import './homepage.css'
import './homepage-motion.css'

type Props = {
  quantity: number
  profile: FitProfile | null
  onCart: () => void
  onChooseFit: (profile: FitProfile, buyNow: boolean) => void
}

export function Homepage({ quantity, profile, onCart, onChooseFit }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  useHomepageMotion(rootRef)
  const fitRef = useRef<HTMLElement>(null)
  const collectionRef = useRef<HTMLElement>(null)
  const fitTrigger = useRef<HTMLButtonElement>(null)
  const noticeRef = useRef<HTMLParagraphElement>(null)
  const [notice, setNotice] = useState('')
  const [height, setHeight] = useState(profile?.height ?? '160')
  const [weight, setWeight] = useState(profile?.weight ?? '55')
  const [skinTone, setSkinTone] = useState(profile?.skinTone ?? 2)
  const [fitOpen, setFitOpen] = useState(false)
  const [ready, setReady] = useState(false)
  const [paused, setPaused] = useState(false)
  const [introComplete, setIntroComplete] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [scale, setScale] = useState(1)
  const maskId = useId().replaceAll(':', '')

  function finishIntro() {
    setIntroComplete(true)
  }

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    function onPreferenceChange() {
      if (preference.matches) finishIntro()
    }
    preference.addEventListener('change', onPreferenceChange)
    return () => preference.removeEventListener('change', onPreferenceChange)
  }, [])

  useEffect(() => {
    const root = rootRef.current!
    const observer = new ResizeObserver(entries => setScale(Math.min(1, entries[0].contentRect.width / 1440)))
    observer.observe(root)
    let cancelled = false
    const images = [homeAssets.hero, homeAssets.textile, homeAssets.logoMask].map(src => {
      const image = new Image()
      image.src = src
      return image.decode()
    })
    Promise.allSettled(images).then(() => { if (!cancelled) setReady(true) })
    return () => { cancelled = true; observer.disconnect() }
  }, [])

  function goToSection(section: 'fit' | 'collection') {
    const target = section === 'fit' ? fitRef.current : collectionRef.current
    target?.scrollIntoView({ block: 'start' })
    target?.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true })
  }

  useEffect(() => {
    function onHashChange() {
      const section = window.location.hash === '#/home/fit' ? fitRef.current : window.location.hash === '#/home/collection' ? collectionRef.current : null
      section?.scrollIntoView({ block: 'start' })
      section?.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true })
    }
    // Parent route handling owns the initial scroll; this handles same-page header links.
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  function unavailable(label: string) {
    if (label === 'Shirts') { window.location.hash = '/shirts'; return }
    if (label === 'Find my fit') { goToSection('fit'); return }
    if (label === 'New collection') { goToSection('collection'); return }
    setNotice(`${label} is not available in this preview.`)
    noticeRef.current?.focus()
  }

  function openFit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFitOpen(true)
  }

  function closeFit() {
    setFitOpen(false)
    fitTrigger.current?.focus({ preventScroll: true })
  }

  function rangeField(name: 'height' | 'weight', label: string, value: string, onChange: (value: string) => void, min: number, max: number, unit: string) {
    const progress = Math.max(0, Math.min(1, (Number(value) - min) / (max - min)))
    return <div className="home-range-control">
      <label className="fit-measurement" htmlFor={`home-${name}`}><span>{label}</span><span className="fit-number-field"><input id={`home-${name}`} type="number" inputMode="decimal" min={min} max={max} step="any" required value={value} onChange={event => onChange(event.target.value)} /><span aria-hidden="true">{unit}</span></span></label>
      <div className="home-range-track" style={{ '--home-range-progress': `${progress * 100}%` } as CSSProperties}>
        <input type="range" aria-label={`${label} slider`} min={min} max={max} value={value || min} onChange={event => onChange(event.target.value)} />
        <img src={homeAssets.rangeHandle} width="20" height="20" alt="" style={{ left: `calc(${progress * 100}% - ${progress * 20}px)` }} />
      </div>
      <div className="home-range-limits"><span>{min} {unit}</span><span>{max} {unit}</span></div>
    </div>
  }

  return <div ref={rootRef} className="checkout-prototype homepage" data-home-ready={ready} data-motion-paused={paused} data-intro-complete={introComplete} style={{ '--home-scale': scale } as CSSProperties}>
    <CheckoutHeader quantity={quantity} onCart={onCart} onUnavailable={unavailable} onHomeSection={goToSection} />
    <main>
      <section className="home-hero" aria-labelledby="home-title" data-figma-node="847:5399">
        <div className="home-hero-photo"><img src={homeAssets.hero} alt="Natural linen pieces hanging in soft daylight" fetchPriority="high" /></div>
        <div className="home-hero-copy" inert={!introComplete} aria-hidden={!introComplete}>
          <h1 id="home-title" tabIndex={-1} data-motion-node="847:5410">A Fit That Feels Like You</h1>
          <p data-motion-node="847:5419"><strong>Mộc Studio</strong> began in Vietnam with a simple idea. Getting dressed should feel like being yourself. We started with linen, clean silhouettes, and enough room to move through the day.</p>
          <div data-motion-node="847:5428"><Button className="home-collection-button" onClick={() => goToSection('collection')}>See our collection<img src={homeAssets.arrowLight} width="20" height="20" alt="" /></Button></div>
        </div>
        {!introComplete && <svg className="home-reveal" viewBox="0 0 1440 909" aria-hidden="true" focusable="false" onAnimationEnd={event => {
          if (event.target === event.currentTarget && event.animationName === 'home-intro-finish') finishIntro()
        }}>
          <defs>
            <pattern id={`${maskId}-textile`} width="530" height="530" patternUnits="userSpaceOnUse" patternTransform="rotate(-90)"><image href={homeAssets.textile} width="530" height="530" /></pattern>
            <mask id={`${maskId}-reveal`} maskUnits="userSpaceOnUse" x="-4096" y="-4096" width="12288" height="12288" style={{ maskType: 'luminance' }}>
              <rect x="-4096" y="-4096" width="12288" height="12288" fill="white" />
              <g data-motion-node="847:5438"><g transform="translate(342 192)"><g data-motion-node="847:5443" className="home-logo-mask"><image href={homeAssets.logoMask} width="679.595" height="453" style={{ filter: 'brightness(0)' }} /></g></g></g>
            </mask>
          </defs>
          <g data-motion-node="847:5433"><rect x="-4096" y="-4096" width="12288" height="12288" fill={`url(#${maskId}-textile)`} mask={`url(#${maskId}-reveal)`} /></g>
        </svg>}
        <Button className="home-motion-toggle" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? 'Play animation' : 'Pause animation'}</Button>
      </section>

      <section className="home-story" aria-labelledby="home-story-title" data-figma-node="847:5446">
        <div className="home-story-background" aria-hidden="true"><img src={homeAssets.storyBackground} alt="" loading="lazy" /></div>
        <h2 id="home-story-title">Our Story</h2>
        <div className="home-story-vietnam-title"><span className="home-pattern-marker" aria-hidden="true" /><h3>It Started in<br />Vietnam</h3></div>
        <img className="home-story-vietnam-photo" src={homeAssets.vietnam} alt="Working with natural linen in Vietnam" loading="lazy" />
        <p className="home-story-intro"><strong>Mộc Studio</strong> began in <strong>Vietnam</strong> with a simple idea. Getting dressed should feel like being yourself. We started with linen, clean silhouettes, and enough room to move through the day.</p>
        <div className="home-story-linen"><img src={homeAssets.linen} alt="Linen fabric and hand-finished details" loading="lazy" /><div><div className="home-story-subheading"><span className="home-pattern-marker" aria-hidden="true" /><h3>Why Linen</h3></div><p>Linen breathes and absorbs moisture, keeping you cool on warm days. Its natural creases and folds add character, showing how each piece moves with you and becomes uniquely yours.</p></div></div>
        <div className="home-story-corner" aria-hidden="true"><img src={homeAssets.linen} alt="" loading="lazy" /><img src={homeAssets.texture} alt="" loading="lazy" /></div>
        <div className="home-story-manila"><img src={homeAssets.manila} alt="Everyday linen styling for Manila" loading="lazy" /><div><div className="home-story-subheading"><span className="home-pattern-marker" aria-hidden="true" /><h3>From Vietnam<br />to Manila</h3></div><p><strong>Manila</strong> is the next chapter in our story. We’re bringing the linen pieces we love to a new city and making room for the ways you’ll wear them, from the morning commute to an unhurried weekend.</p></div></div>
        <div className="home-story-leaves"><img src={homeAssets.leaves} alt="Sunlight through leaves" loading="lazy" /></div>
        <div className="home-story-fit"><div className="home-story-subheading"><span className="home-pattern-marker" aria-hidden="true" /><h3>A Fit That<br />Feels Like You</h3></div><p>The right fit starts with a conversation. Tell us how you like your clothes to fit, and we’ll help you find your perfect piece.</p><Button className="home-soft-button" onClick={() => goToSection('fit')}>Find my fit<img src={homeAssets.arrowDark} width="20" height="20" alt="" /></Button></div>
      </section>

      <section ref={fitRef} className="home-fit" id="home-fit" aria-labelledby="home-fit-title" data-figma-node="847:5480">
        <div className="home-fit-decoration" aria-hidden="true" />
        <div className="home-fit-intro"><h2 id="home-fit-title" tabIndex={-1}>Make it feel like you</h2><p>Finding your perfect fit should feel effortless. Tell us a little about yourself, and we'll help you discover the size and style that feels just right.</p></div>
        <div className="home-fit-layout">
          <ol className="home-fit-steps" aria-label="Fit finder progress">{[['Measure', 'Height & body'], ['Preview', 'See it on you'], ['Your size', 'Recommended']].map(([title, helper], index) => <li key={title} aria-current={index === 0 ? 'step' : undefined}><span className="home-fit-step-dot">{index + 1}</span><div><h3>{title}</h3><p>{helper}</p></div></li>)}</ol>
          <img className="home-fit-model" src={homeAssets.model} alt="Front view of a natural linen outfit" loading="lazy" />
          <form className="home-fit-form" onSubmit={openFit}><h3>A Little About You</h3><div className="home-fit-fields">{rangeField('height', 'Height', height, setHeight, 140, 210, 'cm')}{rangeField('weight', 'Weight', weight, setWeight, 40, 140, 'kg')}</div>
            <fieldset className="home-skin-section"><legend className="shipping-sr-only">Skin tone</legend><p>Choose the shade closest to your natural skin tone.</p><div className="fit-skin-options">{skinTones.map((tone, index) => <label className={skinTone === index ? 'is-selected' : ''} key={tone.name}><input type="radio" name="home-skin-tone" checked={skinTone === index} onChange={() => setSkinTone(index)} /><img src={tone.image} width="40" height="40" alt="" /><span>{tone.name}</span></label>)}</div></fieldset>
            <Button ref={fitTrigger} type="submit" className="home-soft-button">See how it looks on you<img src={homeAssets.arrowFit} width="20" height="20" alt="" /></Button>
          </form>
        </div>
        <img className="home-fit-star" src={homeAssets.fitStar} width="20" height="20" alt="" loading="lazy" />
      </section>

      <div className="home-pattern-divider" aria-hidden="true"><img src={homeAssets.divider} alt="" loading="lazy" /></div>
      <section ref={collectionRef} className="home-featured" id="home-collection" aria-labelledby="home-collection-title" data-figma-node="847:5559">
        <h2 id="home-collection-title" tabIndex={-1}>Featured Collection</h2><p className="home-featured-description" data-motion-node="847:5653">Discover effortless linen pieces designed for sunny days, slow moments, and everything in between.</p>
        <div className="home-gallery-layout"><div className="home-gallery-motion" data-motion-node="847:5569">{featuredPhotos.map(item => <div key={item.node} className={`home-featured-photo is-${item.className}`} data-motion-node={item.node}><img src={item.image} alt={item.foreground ? '' : item.alt} loading="lazy" />{item.foreground && <img className="home-featured-foreground" src={item.foreground} alt={item.alt} loading="lazy" />}</div>)}</div></div>
      </section>
      <p ref={noticeRef} className="cart-status" role="status" tabIndex={-1}>{notice}</p>
    </main>
    <CheckoutFooter onUnavailable={unavailable} />
    {fitOpen && <FitFinderDialog profile={{ ...(profile ?? sampleMeasurements), height, weight, skinTone }} onClose={closeFit} onChoose={(next, buyNow) => { setHeight(next.height); setWeight(next.weight); setSkinTone(next.skinTone); closeFit(); onChooseFit(next, buyNow); if (!buyNow) setNotice('Red Linen Shirt added to your cart.') }} />}
  </div>
}
