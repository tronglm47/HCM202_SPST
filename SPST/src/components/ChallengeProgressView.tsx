import { useState, useEffect } from 'react'
import type { ChallengeProgress } from '../utils/challengeStorage'
import { isDayUnlocked, isDayCompleted, completeDay, resetChallenge, getChallengeProgress } from '../utils/challengeStorage'
import { ChallengeModal } from './ChallengeModal'
import plans from '../plan.json'

interface ChallengeProgressProps {
    planId: number
    progress: ChallengeProgress
    onBack: () => void
    onReset?: () => void
}

interface DayData {
    day: string
    title: string
    progress: string
    description: string
    quote: string
    suggestions: string[]
}

export function ChallengeProgressView({ planId, progress: initialProgress, onBack, onReset }: ChallengeProgressProps) {
    const [progress, setProgress] = useState(initialProgress)
    const [selectedDay, setSelectedDay] = useState<DayData | null>(null)
    const [selectedDayIndex, setSelectedDayIndex] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [refreshKey, setRefreshKey] = useState(0)

    const plan = plans.weeks.find((p: any) => p.id === planId)
    const days: DayData[] = plan?.days || []
    const isCompleted = progress.completedDays.length === 7

    useEffect(() => {
        // Auto refresh mỗi phút để cập nhật ngày mở khóa
        const timer = setInterval(() => {
            setRefreshKey(k => k + 1)
        }, 60000)
        return () => clearInterval(timer)
    }, [planId])

    // Cập nhật progress khi refreshKey thay đổi (sau khi hoàn thành ngày)
    useEffect(() => {
        const updatedProgress = getChallengeProgress(planId)
        if (updatedProgress) {
            setProgress(updatedProgress)
        }
    }, [refreshKey, planId])

    if (!plan) {
        return <div>Không tìm thấy kế hoạch</div>
    }

    const startDate = new Date(progress.startDate)
    const startDateFormatted = startDate.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    const handleDetailClick = (day: DayData, index: number) => {
        setSelectedDay(day)
        setSelectedDayIndex(index)
        setIsModalOpen(true)
    }

    const handleCompleteDay = (index: number) => {
        completeDay(planId, index)
        setRefreshKey(k => k + 1)
        setIsModalOpen(false)
    }

    const handleReset = () => {
        if (confirm('Bạn có chắc muốn reset thử thách? Tất cả tiến độ sẽ bị xóa.')) {
            resetChallenge(planId)
            onReset?.()
        }
    }

    // Completion screen
    if (isCompleted) {
        return (
            <section className="min-h-screen bg-linear-to-br from-parchment to-white flex items-center justify-center px-4">
                <div className="max-w-2xl w-full text-center space-y-8">
                    {/* Celebration Icon */}
                    <div className="flex justify-center">
                        <div className="w-24 h-24 rounded-full bg-lotus/10 flex items-center justify-center">
                            <span className="material-icons text-lotus" style={{ fontSize: '64px' }}>
                                celebration
                            </span>
                        </div>
                    </div>

                    {/* Congratulations */}
                    <div className="space-y-3">
                        <h1 className="font-serif text-5xl font-bold text-pine">
                            Chúc mừng!
                        </h1>
                        <p className="text-xl text-ink/70">
                            Bạn đã hoàn thành thử thách 1 tuần
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-pine/5 rounded-2xl border border-pine/20">
                            <div className="text-3xl font-bold text-pine">7</div>
                            <div className="text-xs text-ink/60 mt-1">Ngày hoàn thành</div>
                        </div>
                        <div className="p-4 bg-lotus/5 rounded-2xl border border-lotus/20">
                            <div className="text-3xl font-bold text-lotus">100%</div>
                            <div className="text-xs text-ink/60 mt-1">Tiến độ</div>
                        </div>
                        <div className="p-4 bg-bamboo/5 rounded-2xl border border-bamboo/20">
                            <div className="text-3xl font-bold text-bamboo">✓</div>
                            <div className="text-xs text-ink/60 mt-1">Đạt mục tiêu</div>
                        </div>
                    </div>

                    {/* Quote */}
                    <div className="p-6 bg-pine/5 rounded-2xl border border-pine/20 italic text-ink/70">
                        "Sinh hoạt giản dị giúp giữ tâm trí trong sáng, dành trọn thời gian cho nhân dân."
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 justify-center pt-4">
                        <button
                            onClick={onBack}
                            className="px-6 py-3 bg-pine hover:bg-pine/90 text-white rounded-lg font-semibold transition-colors"
                        >
                            Quay lại
                        </button>
                        <button
                            onClick={handleReset}
                            className="px-6 py-3 bg-lotus hover:bg-lotus/90 text-white rounded-lg font-semibold transition-colors"
                        >
                            Bắt đầu lại
                        </button>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="min-h-screen bg-linear-to-br from-parchment to-white">
            {/* Header */}
            <div className="bg-linear-to-r from-pine to-bamboo text-white">
                <div className="max-w-6xl mx-auto px-6 py-8 flex justify-between items-start">
                    <div>
                        <p className="text-sm font-semibold tracking-widest uppercase mb-2">Tiến độ của bạn</p>
                        <h1 className="font-serif text-4xl font-bold">{plan.title}</h1>
                        <p className="text-sm mt-2 opacity-90">Bắt đầu: {startDateFormatted}</p>
                    </div>
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                    >
                        <span className="material-icons">arrow_back</span>
                        <span>Quay lại</span>
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Progress Bar */}
                <div key={refreshKey} className="mb-12">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold text-ink">Tiến độ hoàn thành</span>
                        <span className="text-3xl font-bold text-pine">{progress.completedDays.length}/7</span>
                    </div>
                    <div className="w-full bg-pine/10 rounded-full h-4 overflow-hidden">
                        <div
                            className="bg-linear-to-r from-pine to-lotus h-full transition-all duration-500"
                            style={{ width: `${(progress.completedDays.length / 7) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
                    {days.map((day: DayData, index: number) => {
                        const isUnlocked = isDayUnlocked(planId, index)
                        const isCompleted = isDayCompleted(planId, index)
                        const isSpecial = index === 6

                        return (
                            <div
                                key={index}
                                className={`rounded-3xl border-2 p-8 transition-all w-full ${isSpecial
                                    ? 'border-lotus/40 bg-lotus/5 md:col-span-2 lg:max-w-md'
                                    : 'border-pine/40 bg-pine/5'
                                    } ${!isUnlocked ? 'opacity-60' : ''}`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-bamboo">
                                            Ngày {index + 1}
                                        </p>
                                        <p className="text-lg font-semibold text-ink mt-2">{day.title}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        {isCompleted ? (
                                            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1 whitespace-nowrap">
                                                <span className="material-icons text-sm">check_circle</span>
                                                Hoàn thành
                                            </span>
                                        ) : isUnlocked ? (
                                            <span className={`text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1 whitespace-nowrap ${isSpecial
                                                ? 'bg-lotus/10 text-lotus'
                                                : 'bg-pine/10 text-pine'
                                                }`}>
                                                <span className="material-icons text-sm">schedule</span>
                                                Đang chờ
                                            </span>
                                        ) : (
                                            <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1 whitespace-nowrap">
                                                <span className="material-icons text-sm">lock</span>
                                                Chưa mở
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <p className="text-sm text-ink/70 mb-6 line-clamp-3">
                                    {day.description}
                                </p>

                                <div className="flex gap-3 w-full">
                                    {isUnlocked && (
                                        <>
                                            <button
                                                onClick={() => handleDetailClick(day, index)}
                                                className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all text-white flex items-center justify-center gap-2 ${isSpecial
                                                    ? 'bg-lotus hover:bg-lotus/90'
                                                    : 'bg-pine hover:bg-pine/90'
                                                    }`}
                                            >
                                                <span>Chi tiết</span>
                                                <span className="material-icons text-sm">arrow_forward</span>
                                            </button>
                                            {!isCompleted && (
                                                <button
                                                    onClick={() => handleCompleteDay(index)}
                                                    className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all text-white flex items-center justify-center gap-2 ${isSpecial
                                                        ? 'bg-lotus/70 hover:bg-lotus'
                                                        : 'bg-pine/70 hover:bg-pine'
                                                        }`}
                                                >
                                                    <span>Hoàn thành</span>
                                                    <span className="material-icons text-sm">check</span>
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Footer Message */}
                <div className="mt-12 p-6 bg-bamboo/5 rounded-2xl border border-bamboo/20">
                    <p className="text-base text-ink/70 italic">
                        💡 Mỗi ngày mới, một day mới được mở khóa. Hãy kiên trì hoàn thành thử thách này để nuôi dưỡng lối sống giản dị.
                    </p>
                </div>
            </div>

            {/* Modal Chi Tiết */}
            {selectedDay && (
                <ChallengeModal
                    day={selectedDay}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onComplete={() => handleCompleteDay(selectedDayIndex)}
                    dayIndex={selectedDayIndex}
                />
            )}
        </section>
    )
}
