import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react'
import { Button } from '../../components/ui/Button'
import { shirtAssets, skinTones } from './assets'
import { sampleFitResult, sampleMeasurements, type FitProfile } from './data'

type Props = {
  profile: FitProfile | null
  onClose: () => void
  onChoose: (profile: FitProfile, buyNow: boolean) => void
}

export function FitFinderDialog({ profile, onClose, onChoose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const scrollRef = useRef<HTMLFormElement>(null)
  const [measurements, setMeasurements] = useState<FitProfile>(() => ({ ...(profile ?? sampleMeasurements) }))
  const [step, setStep] = useState<'measurements' | 'result'>('measurements')
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current!
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    return () => { dialog.close(); document.body.style.overflow = previousOverflow }
  }, [])

  function showResult(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStep('result')
    dialogRef.current?.scrollTo(0, 0)
    closeRef.current?.focus({ preventScroll: true })
  }

  function measurement(name: 'height' | 'weight' | 'bust' | 'waist' | 'hips', label: string, unit = 'cm', min = 1, max = 300) {
    return <label className="fit-measurement" htmlFor={`fit-${name}`}>
      <span>{label}</span>
      <span className="fit-number-field"><input id={`fit-${name}`} name={name} type="number" inputMode="decimal" step="any" min={min} max={max} required value={measurements[name]} onChange={event => setMeasurements({ ...measurements, [name]: event.target.value })} /><span aria-hidden="true">{unit}</span></span>
    </label>
  }

  return <dialog ref={dialogRef} className={`shirts-fit-dialog is-${step}`} aria-labelledby="fit-dialog-title" onCancel={event => { event.preventDefault(); onClose() }} onClick={event => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose() } }}>
    <div className="fit-dialog-top"><span className="shipping-sr-only">FIT FINDER / {step === 'result' ? 'YOUR RESULT' : '01 OF 02'}</span><Button ref={closeRef} className="fit-close" aria-label="Close fit finder" onClick={onClose}>×</Button></div>
    {step === 'measurements' ? <>
      <div className="fit-dialog-heading"><h2 id="fit-dialog-title">Let us know more about you</h2><p>Find your size and discover pieces that suit you best.</p></div>
      <form ref={scrollRef} className="fit-measurements-scroll" onSubmit={showResult}>
        <section className="fit-input-section" aria-labelledby="fit-height-title">
          <h3 id="fit-height-title">1. Height &amp; weight</h3>
          <div className="fit-height-weight">
            {(['height', 'weight'] as const).map(name => {
              const min = name === 'height' ? 140 : 40
              const max = name === 'height' ? 210 : 140
              const unit = name === 'height' ? 'cm' : 'kg'
              return <div className="fit-range-control" key={name}>
                {measurement(name, name === 'height' ? 'Height' : 'Weight', unit, min, max)}
                <input className="fit-range" type="range" aria-label={`${name === 'height' ? 'Height' : 'Weight'} slider`} min={min} max={max} value={measurements[name] || min} style={{ '--fit-progress': `${Math.max(0, Math.min(100, (Number(measurements[name]) - min) / (max - min) * 100))}%` } as CSSProperties} onChange={event => setMeasurements({ ...measurements, [name]: event.target.value })} />
                <div className="fit-range-labels"><span>{min} {unit}</span><span>{max} {unit}</span></div>
              </div>
            })}
          </div>
        </section>
        <section className="fit-input-section" aria-labelledby="fit-body-title">
          <h3 id="fit-body-title">2. Body measurements</h3>
          <p className="fit-muted">Measure around the fullest bust, natural waist and fullest hips.</p>
          <div className="fit-body-fields">{measurement('bust', 'Bust')}{measurement('waist', 'Waist')}{measurement('hips', 'Hips')}</div>
          <p className="fit-input-help">Use a soft tape and keep it level, without pulling tight.</p>
        </section>
        <fieldset className="fit-input-section fit-skin-section">
          <legend>3. Skin tone</legend><p className="fit-muted">Choose the shade closest to your natural skin tone.</p>
          <div className="fit-skin-options">{skinTones.map((tone, index) => <label key={tone.name} className={measurements.skinTone === index ? 'is-selected' : ''}>
            <input type="radio" name="skin-tone" value={index} checked={measurements.skinTone === index} onChange={() => setMeasurements({ ...measurements, skinTone: index })} />
            <img src={tone.image} width="40" height="40" alt="" /><span>{tone.name}</span>
          </label>)}</div>
        </fieldset>
        <div className="fit-form-actions"><Button variant="primary" type="submit">See my body type</Button><p className="fit-input-help">Your measurements are only used to personalize your fit.</p></div>
      </form>
    </> : <div className="fit-result-grid">
      <div className="fit-result-copy">
        <div className="fit-result-description"><div><p>Your body type would be</p><h2 id="fit-dialog-title">{sampleFitResult.shape}</h2></div><p>{sampleFitResult.description}</p><div className="fit-recommendation"><h3>Your size: {sampleFitResult.size}</h3><p>{sampleFitResult.reason}</p></div></div>
        <div className="fit-result-actions"><Button variant="primary" onClick={() => onChoose(measurements, true)}>Buy now</Button><Button className="shirts-button-outline" onClick={() => onChoose(measurements, false)}>Add to cart</Button></div>
      </div>
      <div className="fit-result-preview"><p>How it would look on you</p><div className="fit-result-image"><img src={shirtAssets.outfit} alt="Figma sample preview of the linen outfit" /></div></div>
    </div>}
  </dialog>
}
