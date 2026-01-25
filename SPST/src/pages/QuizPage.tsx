import { QuickQuiz } from '../components/QuickQuiz'
import { Footer } from '../components/Footer'

export function QuizPage() {
    return (
        <div className="min-h-screen bg-parchment px-4 pb-16 pt-6 sm:px-8 lg:px-16">
            <div className="mx-auto flex max-w-6xl flex-col gap-10">
                <QuickQuiz />
                <Footer />
            </div>
        </div>
    )
}
