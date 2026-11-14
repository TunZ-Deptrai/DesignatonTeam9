import { useEffect, useRef, useState, type KeyboardEvent, type SelectHTMLAttributes } from 'react'
import chevron from '../../assets/checkout/chevron-down.svg'
import check from '../../assets/checkout/check.svg'
import './select-field.css'

type Props = SelectHTMLAttributes<HTMLSelectElement> & { id: string; label: string; options: readonly string[] }

export function SelectField({ label, id, options, value, disabled, ...props }: Props) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const [above, setAbove] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const selectRef = useRef<HTMLSelectElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef({ text: '', time: 0 })
  const selected = Math.max(0, options.indexOf(String(value ?? '')))

  useEffect(() => {
    if (!open) return
    function closeOutside(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', closeOutside)
    return () => document.removeEventListener('pointerdown', closeOutside)
  }, [open])

  useEffect(() => {
    if (!open) return
    const list = listRef.current
    const option = list?.children[active] as HTMLElement | undefined
    if (!list || !option) return
    if (option.offsetTop < list.scrollTop) list.scrollTop = option.offsetTop
    else if (option.offsetTop + option.offsetHeight > list.scrollTop + list.clientHeight) list.scrollTop = option.offsetTop + option.offsetHeight - list.clientHeight
  }, [open, active])

  function expand(index = selected) {
    const bounds = triggerRef.current?.getBoundingClientRect()
    if (bounds) setAbove(window.innerHeight - bounds.bottom < Math.min(256, options.length * 44 + 16) && bounds.top > window.innerHeight - bounds.bottom)
    setActive(index)
    setOpen(true)
  }

  function choose(index: number) {
    const select = selectRef.current
    if (select && options[index] !== undefined && select.value !== options[index]) {
      // Preserve the real select's form, autofill and React change behavior.
      select.value = options[index]
      select.dispatchEvent(new Event('change', { bubbles: true }))
    }
    setOpen(false)
    triggerRef.current?.focus({ preventScroll: true })
  }

  function keyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'Tab') { setOpen(false); return }
    if (event.key === 'Escape') { event.preventDefault(); setOpen(false); return }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (open) choose(active)
      else expand()
      return
    }
    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault()
      const index = event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : ((open ? active : selected) + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length
      if (open) setActive(index)
      else expand(event.key === 'ArrowDown' || event.key === 'ArrowUp' ? selected : index)
      return
    }
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault()
      const now = Date.now()
      const text = (now - searchRef.current.time < 700 ? searchRef.current.text : '') + event.key.toLowerCase()
      searchRef.current = { text, time: now }
      const index = options.findIndex(option => option.toLowerCase().startsWith(text))
      if (index >= 0) { if (open) setActive(index); else expand(index) }
    }
  }

  return (
    <div ref={rootRef} className={`shipping-field studio-select${open ? ' is-open' : ''}`} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false) }}>
      <label id={`${id}-label`} htmlFor={`${id}-trigger`}>{label}</label>
      <div className="studio-select-control">
        <select ref={selectRef} id={id} value={value} disabled={disabled} {...props} className="studio-select-native" tabIndex={-1} aria-hidden="true" onInvalid={event => { event.preventDefault(); triggerRef.current?.focus() }}>
          {options.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
        <button ref={triggerRef} id={`${id}-trigger`} className="studio-select-trigger" type="button" role="combobox" aria-labelledby={`${id}-label ${id}-value`} aria-expanded={open} aria-controls={`${id}-listbox`} aria-haspopup="listbox" aria-required={props.required} aria-activedescendant={open ? `${id}-option-${active}` : undefined} disabled={disabled} onClick={() => open ? setOpen(false) : expand()} onKeyDown={keyDown}>
          <span id={`${id}-value`}>{options[selected]}</span><img src={chevron} width="20" height="20" alt="" />
        </button>
        {open && <div ref={listRef} className={`studio-select-list${above ? ' opens-above' : ''}`} id={`${id}-listbox`} role="listbox" aria-labelledby={`${id}-label`}>
          {options.map((option, index) => <div id={`${id}-option-${index}`} key={option} role="option" aria-selected={index === selected} className={`studio-select-option${index === active ? ' is-active' : ''}`} onPointerMove={() => setActive(index)} onPointerDown={event => event.preventDefault()} onClick={() => choose(index)}><span>{option}</span>{index === selected && <img src={check} width="20" height="20" alt="" />}</div>)}
        </div>}
      </div>
    </div>
  )
}
