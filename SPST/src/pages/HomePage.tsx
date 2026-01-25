import { Hero } from '../components/Hero'
import { DailyRoutine } from '../components/DailyRoutine'
import { WorkingSpaces } from '../components/WorkingSpaces'
import { Principles } from '../components/Principles'
import { Quotes } from '../components/Quotes'
import { Footer } from '../components/Footer'

export function HomePage() {
    return (
        <div className="min-h-screen bg-parchment px-4 pb-16 pt-6 sm:px-8 lg:px-16">
            <div className="mx-auto flex max-w-6xl flex-col gap-10">
                <Hero />
                <DailyRoutine />
                <WorkingSpaces />
                <Principles />
                <Quotes />
                <Footer />
            </div>
        </div>
    )
}
