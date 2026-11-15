import main from '../../assets/shirts/shirt-main.png'
import fabric from '../../assets/shirts/shirt-fabric.png'
import detail from '../../assets/shirts/shirt-detail.png'
import collar from '../../assets/shirts/shirt-collar.png'
import star from '../../assets/shirts/star.svg'
import swatches from '../../assets/shirts/swatches.svg'
import minus from '../../assets/shirts/minus.svg'
import plus from '../../assets/shirts/plus.svg'
import check from '../../assets/shirts/check.svg'
import outfit from '../../assets/shirts/fit-outfit.png'
import bodyShape from '../../assets/shirts/body-shape.png'
import fair from '../../assets/shirts/skin-fair.svg'
import light from '../../assets/shirts/skin-light.svg'
import medium from '../../assets/shirts/skin-medium.svg'
import tan from '../../assets/shirts/skin-tan.svg'
import brown from '../../assets/shirts/skin-brown.svg'
import deep from '../../assets/shirts/skin-deep.svg'
import savedTan from '../../assets/shirts/saved-skin-tan.svg'

export const shirtAssets = { main, star, swatches, minus, plus, check, outfit, bodyShape, savedTan }
export const gallery = [
  { src: fabric, alt: 'Linen fabric drape' },
  { src: main, alt: 'Red Linen Shirt, front view' },
  { src: detail, alt: 'Linen texture and stitching detail' },
  { src: collar, alt: 'Shirt collar and buttons' },
]
export const skinTones = [
  { name: 'Fair', image: fair }, { name: 'Light', image: light },
  { name: 'Medium', image: medium }, { name: 'Tan', image: tan },
  { name: 'Brown', image: brown }, { name: 'Deep', image: deep },
] as const
