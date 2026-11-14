type AssetIconProps = {
  src: string
  size?: 12 | 20
}

export function AssetIcon({ src, size = 20 }: AssetIconProps) {
  return <img className="moc-icon" src={src} width={size} height={size} alt="" aria-hidden="true" />
}
