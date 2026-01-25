import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { HomePage } from './pages/HomePage'
import { QuizPage } from './pages/QuizPage'
import { ChallengePage } from './pages/ChallengePage'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/challenge" element={<ChallengePage />} />
      </Routes>
    </Router>
  )
}

export default App
