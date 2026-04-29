interface ImageProps {
  src: string
  alt: string
  className?: string
  fill?: boolean
  sizes?: string
  priority?: boolean
}

export default function NextImage({ src, alt, className, fill = false, sizes, priority }: ImageProps) {
  if (fill) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        sizes={sizes}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      sizes={sizes}
    />
  )
}
