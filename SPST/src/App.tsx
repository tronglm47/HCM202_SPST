import { DailyRoutine } from './components/DailyRoutine'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Principles } from './components/Principles'
import { QuickQuiz } from './components/QuickQuiz'
import { Quotes } from './components/Quotes'
import { SavingChallenge } from './components/SavingChallenge'
import { WorkingSpaces } from './components/WorkingSpaces'

function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-parchment px-4 pb-16 pt-6 sm:px-8 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-10">
          <Hero />
          <DailyRoutine />
          <Principles />
          <WorkingSpaces />
          <Quotes />
          <QuickQuiz />
          <SavingChallenge />
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
