type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  singleLineDescription?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  singleLineDescription = false,
}: SectionHeadingProps) {
  return (
    <div className="space-y-3 text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="font-serif text-3xl font-semibold text-pine sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p
          className={`text-base text-ink/80 sm:text-lg ${
            singleLineDescription
              ? 'whitespace-nowrap'
              : 'mx-auto max-w-3xl'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}
