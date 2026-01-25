import { useState, useEffect } from 'react'
import plans from '../plan.json'
import { ChallengeModal } from './ChallengeModal'
import { ChallengeProgressView } from './ChallengeProgressView'
import { getChallengeProgress, initializeChallenge, isDayUnlocked, isDayCompleted } from '../utils/challengeStorage'

interface DayData {
    day: string
    title: string
    progress: string
    description: string
    quote: string
    suggestions: string[]
}

interface ChallengeDayProps {
    day: DayData
    index: number
    onDetailClick: (day: DayData, index: number) => void
}

const getIconForDay = (dayIndex: number) => {
    const icons = ['home', 'close', 'lightbulb', 'checkroom', 'savings', 'people', 'celebration']
    return icons[dayIndex % 7]
}

const getIconColor = (dayIndex: number) => {
    return dayIndex === 6 ? 'text-lotus' : 'text-pine'
}

const getIconBgColor = (dayIndex: number) => {
    return dayIndex === 6 ? 'bg-lotus/20' : 'bg-pine/20'
}

function ChallengeDay({ day, index, isAnimating, planId, hasStarted }: ChallengeDayProps & { isAnimating: boolean; planId: number; hasStarted: boolean }) {
    const [isFlipped, setIsFlipped] = useState(false)
    const isLastDay = index === 6
    // Nếu chưa bắt đầu, tất cả day đều mở khóa. Nếu đã bắt đầu, check thực tế
    const isUnlocked = hasStarted ? isDayUnlocked(planId, index) : true
    const isCompleted = isDayCompleted(planId, index)

    return (
        <div
            onClick={() => !isAnimating && !isFlipped && isUnlocked && setIsFlipped(!isFlipped)}
            className={`h-80 cursor-pointer transition-all ${isAnimating ? 'opacity-0' : 'opacity-100'} ${isLastDay ? 'lg:col-span-2 lg:max-w-md lg:mx-auto lg:w-full' : ''} ${isFlipped ? 'cursor-not-allowed' : ''} ${!isUnlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={{
                animation: isAnimating ? `floatUp 0.8s ease forwards ${index * 100}ms` : 'none'
            }}
        >
            <div
                className="relative w-full h-full transition-transform duration-600 shadow-lg rounded-3xl"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
            >
                {/* Front of card */}
                <div
                    className="absolute w-full h-full bg-white/80 rounded-3xl border-4 border-bamboo/40 p-6 flex flex-col items-center justify-center text-center pointer-events-none"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div className="absolute inset-0 bg-linear-to-br from-parchment to-white opacity-10 rounded-3xl" />
                    <div className="relative z-10 flex flex-col items-center justify-center h-full">
                        {!isUnlocked ? (
                            <>
                                <div className={`w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4`}>
                                    <span
                                        className="material-icons text-gray-400"
                                        style={{ fontSize: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        lock
                                    </span>
                                </div>
                                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-400 mb-2">
                                    Chưa mở
                                </p>
                                <p className="font-serif text-3xl text-gray-400 font-bold">
                                    {String(index + 1).padStart(2, '0')}
                                </p>
                            </>
                        ) : (
                            <>
                                <div className={`w-16 h-16 rounded-full ${getIconBgColor(index)} flex items-center justify-center mb-4`}>
                                    <span
                                        className={`material-icons ${getIconColor(index)}`}
                                        style={{ fontSize: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        {getIconForDay(index)}
                                    </span>
                                </div>
                                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-lotus mb-2">
                                    Ngày
                                </p>
                                <p className="font-serif text-5xl text-pine font-bold">
                                    {String(index + 1).padStart(2, '0')}
                                </p>
                                {isCompleted && (
                                    <p className="text-xs font-bold uppercase tracking-widest text-green-600 mt-2">
                                        ✓ Hoàn thành
                                    </p>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Back of card */}
                <div
                    className="absolute w-full h-full bg-white/80 rounded-3xl border-4 border-t-8 border-bamboo/40 border-t-pine p-6 flex flex-col justify-between"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    <div>
                        <div className="flex justify-between items-start mb-6">
                            <span className="text-[10px] tracking-widest uppercase font-bold text-lotus">
                                Nhiệm vụ
                            </span>
                            <span className="bg-pine/10 text-pine text-[10px] px-2 py-1 rounded font-bold">
                                {day.progress}
                            </span>
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-pine mb-4 leading-tight">
                            {day.title}
                        </h3>
                        <p className="text-sm text-ink/70 leading-relaxed line-clamp-2">
                            {day.description}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export function ChallengeContent({ planId }: { planId: number }) {
    const [isAnimating, setIsAnimating] = useState(true)
    const [selectedDay, setSelectedDay] = useState<DayData | null>(null)
    const [selectedDayIndex, setSelectedDayIndex] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showProgress, setShowProgress] = useState(false)
    const [challengeProgress, setChallengeProgress] = useState(() => getChallengeProgress(planId))

    const plan = plans.weeks.find((p: any) => p.id === planId)

    useEffect(() => {
        setIsAnimating(true)
        const timer = setTimeout(() => setIsAnimating(false), 1400)
        return () => clearTimeout(timer)
    }, [planId])

    useEffect(() => {
        // Cập nhật progress khi nó thay đổi
        const progress = getChallengeProgress(planId)
        setChallengeProgress(progress)
    }, [planId, showProgress])

    const handleDetailClick = (day: DayData, index: number) => {
        setSelectedDay(day)
        setSelectedDayIndex(index)
        setIsModalOpen(true)
    }

    const handleCompleteChallenge = () => {
        // Thêm logic hoàn thành thử thách ở đây
        console.log('Hoàn thành thử thách ngày', selectedDayIndex + 1)
        setIsModalOpen(false)
    }

    const handleAcceptChallenge = () => {
        if (!challengeProgress) {
            const newProgress = initializeChallenge(planId)
            setChallengeProgress(newProgress)
        }
        setShowProgress(true)
    }

    if (!plan) {
        return <div>Không tìm thấy kế hoạch</div>
    }

    if (showProgress && challengeProgress) {
        return (
            <ChallengeProgressView
                planId={planId}
                progress={challengeProgress}
                onBack={() => setShowProgress(false)}
                onReset={() => {
                    setChallengeProgress(null)
                    setShowProgress(false)
                }}
            />
        )
    }

    return (
        <section className="space-y-12">
            <div className="text-center space-y-4">
                <p className="eyebrow">Thử thách 1 tuần</p>
                <h1 className="font-serif text-4xl sm:text-5xl text-pine font-semibold leading-tight">
                    {plan.title}
                </h1>
                <p className="max-w-2xl mx-auto text-ink/70 leading-relaxed">
                    Mỗi ngày là một hành động nhỏ giúp nuôi dưỡng lối sống giản dị. Hãy lật mở một thẻ để khám phá nhiệm vụ hôm nay của bạn.
                </p>

            </div>
            <div className="flex justify-center">
                <button
                    onClick={handleAcceptChallenge}
                    className={`py-3 px-5 bg-pine hover:bg-pine/90 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2`}
                >
                    {challengeProgress ? 'Xem tiến độ' : 'Chấp Nhận Thử Thách'}
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                {plan.days.map((day: DayData, index: number) => (
                    <ChallengeDay
                        key={`${day.day}-${index}`}
                        day={day}
                        index={index}
                        isAnimating={isAnimating}
                        onDetailClick={handleDetailClick}
                        planId={planId}
                        hasStarted={!!challengeProgress}
                    />
                ))}
            </div>

            <div className="text-center pb-12">
                <div className="inline-block p-1 bg-pine/5 rounded-2xl mb-6">
                    <div className="px-8 py-6 rounded-xl border border-pine/10 bg-white/50 italic text-ink/70 max-w-2xl">
                        "Sinh hoạt giản dị giúp giữ tâm trí trong sáng, dành trọn thời gian cho nhân dân."
                    </div>
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-bamboo/60">
                    Dự án giáo dục về lối sống giản dị
                </p>
            </div>

            <ChallengeModal
                day={selectedDay}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onComplete={handleCompleteChallenge}
                dayIndex={selectedDayIndex}
            />

            <style>{`
                @keyframes floatUp {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    )
}
