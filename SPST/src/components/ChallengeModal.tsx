import { useEffect } from 'react'

interface DayData {
    day: string
    title: string
    progress: string
    description: string
    quote: string
    suggestions: string[]
}

interface ChallengeModalProps {
    day: DayData | null
    isOpen: boolean
    onClose: () => void
    onComplete: () => void
    dayIndex: number
}

export function ChallengeModal({ day, isOpen, onClose, onComplete, dayIndex }: ChallengeModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    if (!isOpen || !day) return null

    const isLastDay = dayIndex === 6

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-8">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-lotus mb-2">
                                {day.day}
                            </p>
                            <h2 className="font-serif text-3xl font-bold text-pine">{day.title}</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-ink/60 hover:text-ink transition-colors"
                        >
                            <span className="material-icons text-2xl">close</span>
                        </button>
                    </div>

                    {/* Progress */}
                    <div className="mb-6">
                        <p className={`text-sm font-semibold text-right px-4 py-2 rounded-full inline-block ${isLastDay ? 'bg-lotus/20 text-lotus' : 'bg-pine/20 text-pine'}`}>
                            Tiến độ {day.progress}
                        </p>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <p className="text-ink/80 leading-relaxed text-base">
                            {day.description}
                        </p>
                    </div>

                    {/* Quote */}
                    <div className={`mb-8 pl-6 border-l-4 ${isLastDay ? 'border-lotus' : 'border-pine'}`}>
                        <p className="text-ink/70 italic leading-relaxed">
                            "{day.quote}"
                        </p>
                    </div>

                    {/* Suggestions */}
                    <div className="mb-8">
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-lotus mb-4">
                            Gợi ý thực hiện
                        </h3>
                        <ul className="space-y-3">
                            {day.suggestions.map((suggestion, idx) => (
                                <li key={idx} className="flex gap-3 items-start">
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${isLastDay ? 'bg-lotus/20 text-lotus' : 'bg-pine/20 text-pine'}`}>
                                        <span className="material-icons text-sm">done</span>
                                    </span>
                                    <span className="text-ink/80">{suggestion}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <button
                            onClick={onComplete}
                            className={`flex-1 py-3 ${isLastDay ? 'bg-lotus hover:bg-lotus/90' : 'bg-pine hover:bg-pine/90'} text-white rounded-full text-sm font-semibold transition-all flex items-center justify-center gap-2`}
                        >
                            <span className="material-icons text-sm">done</span>
                            <span>Hoàn thành thử thách</span>
                        </button>
                        <button
                            onClick={onClose}
                            className="px-6 py-3 border-2 border-bamboo/40 text-ink/70 rounded-full text-sm font-semibold transition-all hover:bg-parchment"
                        >
                            Để sau
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
