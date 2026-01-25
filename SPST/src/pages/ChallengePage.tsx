import { useState, useEffect } from 'react'
import { ChallengeOverview } from '../components/ChallengeOverview'
import { ChallengeContent } from '../components/ChallengeContent'
import { Footer } from '../components/Footer'
import { getChallengeProgress } from '../utils/challengeStorage'
import plans from '../plan.json'

export function ChallengePage() {
    const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null)

    useEffect(() => {
        // Check xem có challenge nào đã bắt đầu không
        const firstPlanId = plans.weeks[0].id
        const progress = getChallengeProgress(firstPlanId)

        if (progress) {
            // Nếu đã có challenge, navigate thẳng đến content
            setSelectedPlanId(firstPlanId)
        }
    }, [])

    const handleStart = () => {
        // Random một plan từ plan.json
        const randomIndex = Math.floor(Math.random() * plans.weeks.length)
        const randomPlanId = plans.weeks[randomIndex].id
        setSelectedPlanId(randomPlanId)
    }

    return (
        <div className="min-h-screen bg-parchment px-4 pb-16 pt-6 sm:px-8 lg:px-16">
            <div className="mx-auto flex max-w-6xl flex-col gap-10">
                {selectedPlanId === null ? (
                    <ChallengeOverview onStart={handleStart} />
                ) : (
                    <>

                        <ChallengeContent planId={selectedPlanId} />
                    </>
                )}
                <Footer />
            </div>
        </div>
    )
}
