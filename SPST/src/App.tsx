import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { HomePage } from './pages/HomePage'
import { QuizPage } from './pages/QuizPage'
import { ChallengePage } from './pages/ChallengePage'
import { RankingPage } from './pages/RankingPage'
import { ReferencesPage } from './pages/ReferencesPage'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/challenge" element={<ChallengePage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/references" element={<ReferencesPage />} />
      </Routes>
    </Router>
  )
}

export default App
