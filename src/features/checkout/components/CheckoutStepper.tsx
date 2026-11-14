import { Button } from '../../../components/ui/Button'

type Step = 'cart' | 'shipping' | 'payment' | 'review'
const steps: Step[] = ['cart', 'shipping', 'payment', 'review']

export function CheckoutStepper({ onCart, active = 1, onNavigate }: { onCart: () => void; active?: number; onNavigate?: (step: Step) => void }) {
  return (
    <nav aria-label="Checkout progress" className="checkout-stepper">
      <ol>
        {['Cart', 'Shipping', 'Payment', 'Review'].map((label, index) => (
          <li key={label} className={index <= active ? 'step-complete' : ''} aria-current={index === active ? 'step' : undefined}>
            {index < active ? <Button onClick={() => index === 0 ? onCart() : onNavigate?.(steps[index])}><span className="step-dot">{index + 1}</span><span>{label}</span></Button>
              : <span className="step-label"><span className="step-dot">{index + 1}</span><span>{label}</span></span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
