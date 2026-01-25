import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SectionHeading } from './SectionHeading'
import quizData from '../quiz.json'

type AnswerOption = {
  text: string
  isCorrect: boolean
}

type QuizQuestion = {
  id: number
  chapterName: string
  context: string
  question: string
  answers: AnswerOption[]
}

type RankingEntry = {
  id?: string
  name: string
  time: number
  point: number
}

export function QuickQuiz() {
  const navigate = useNavigate()
  const [playerName, setPlayerName] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [isNameConfirmed, setIsNameConfirmed] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [points, setPoints] = useState(30)
  const [attempts, setAttempts] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [lastResult, setLastResult] = useState<
    'correct' | 'wrong' | null
  >(null)
  const [lastPenalty, setLastPenalty] = useState<number | null>(null)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerOption | null>(
    null,
  )
  const [startTime, setStartTime] = useState<number | null>(null)
  const [elapsedTime, setElapsedTime] = useState<number | null>(null)
  const [isPosting, setIsPosting] = useState(false)
  const [postError, setPostError] = useState<string | null>(null)
  const [posted, setPosted] = useState(false)

  const rankingEndpoint =
    'https://6727111d302d03037e6f3df4.mockapi.io/api/v1/ranking'

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const questions = useMemo<QuizQuestion[]>(() => {
    const allQuestions = quizData.chapters.flatMap((chapter) =>
      chapter.questions.map((question) => ({
        id: question.id,
        chapterName: chapter.chapter_name,
        context: question.context,
        question: question.question,
        answers: question.options.map((option) => ({
          text: option.text,
          isCorrect: Boolean(option.is_correct),
        })),
      })),
    )
    return shuffleArray(allQuestions)
  }, [])

  useEffect(() => {
    const storedName = localStorage.getItem('quizPlayerName')
    if (storedName) {
      setPlayerName(storedName)
      setNameInput(storedName)
      setIsNameConfirmed(true)
    }
  }, [])

  useEffect(() => {
    if (!isNameConfirmed) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
    document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isNameConfirmed])

  const handleConfirmName = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = nameInput.trim()
    if (!trimmed) return
    localStorage.setItem('quizPlayerName', trimmed)
    setPlayerName(trimmed)
    setIsNameConfirmed(true)
    if (!startTime) setStartTime(Date.now())
  }

  const rankingComparator = (a: RankingEntry, b: RankingEntry) => {
    if (a.point !== b.point) return b.point - a.point
    if (a.time !== b.time) return a.time - b.time
    return 0
  }

  const fetchRankingEntries = async (): Promise<RankingEntry[]> => {
    const response = await fetch(rankingEndpoint)
    if (!response.ok) {
      throw new Error('GET_FAILED')
    }
    const data = (await response.json()) as RankingEntry[]
    return data
  }

  const postResult = async (
    durationSeconds: number,
    totalPlays: number,
  ) => {
    if (isPosting) return
    setIsPosting(true)
    setPostError(null)

    try {
      const newEntry: RankingEntry = {
        name: playerName,
        time: durationSeconds,
        point: totalPlays,
      }

      const rankingEntries = await fetchRankingEntries()
      const sortedEntries = [...rankingEntries].sort(rankingComparator)
      const topEntries = sortedEntries.slice(0, 10)
      const worstTopEntry = topEntries[topEntries.length - 1]
      const qualifiesForTop10 =
        topEntries.length < 10 ||
        (worstTopEntry && rankingComparator(newEntry, worstTopEntry) < 0)

      if (!qualifiesForTop10) {
        setPosted(false)
        setPostError('Kết quả chưa lọt top 10 nên không được lưu.')
        return
      }

      if (topEntries.length >= 10 && worstTopEntry?.id) {
        await fetch(`${rankingEndpoint}/${worstTopEntry.id}`, {
          method: 'DELETE',
        })
      }

      const response = await fetch(rankingEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntry),
      })

      if (!response.ok) {
        throw new Error('POST_FAILED')
      }

      setPosted(true)
    } catch (error) {
      setPostError('Chưa thể gửi kết quả. Vui lòng thử lại sau.')
    } finally {
      setIsPosting(false)
    }
  }

  const finishGame = async (finalAttempts: number, finalPoints: number) => {
    if (isFinished) return
    const endTime = Date.now()
    const effectiveStart = startTime ?? endTime
    const durationSeconds = Math.max(
      1,
      Math.round((endTime - effectiveStart) / 1000),
    )

    setElapsedTime(durationSeconds)
    setIsFinished(true)
    await postResult(durationSeconds, finalAttempts)
  }

  const handleAnswer = async (answer: AnswerOption) => {
    if (isFinished) return
    if (hasAnswered) return
    if (!startTime) setStartTime(Date.now())

    const nextAttempts = attempts + 1
    setAttempts(nextAttempts)

    let nextPoints = points
    let penalty = 0
    if (answer.isCorrect) {
      setLastResult('correct')
      setLastPenalty(0)
    } else {
      penalty = Math.floor(Math.random() * 11) + 10
      nextPoints = Math.max(0, points - penalty)
      setLastResult('wrong')
      setLastPenalty(penalty)
      setPoints(nextPoints)
    }

    setSelectedAnswer(answer)
    setHasAnswered(true)

    if (nextPoints <= 0) {
      await finishGame(nextAttempts, nextPoints)
      return
    }
  }

  const handleNextQuestion = async () => {
    if (isFinished || !hasAnswered) return

    if (currentIndex >= questions.length - 1) {
      await finishGame(attempts, points)
      return
    }

    setCurrentIndex((prev) => prev + 1)
    setHasAnswered(false)
    setSelectedAnswer(null)
    setLastResult(null)
    setLastPenalty(null)
  }

  const currentQuestion = questions[currentIndex]

  return (
    <section
      id="quiz"
      className="section-shell space-y-10 scroll-mt-24 bg-white/85"
    >
      {!isNameConfirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-pine/80 px-4 backdrop-blur-sm">
          <form
            onSubmit={handleConfirmName}
            className="w-full max-w-md space-y-4 rounded-[2rem] border border-bamboo/30 bg-white p-6 text-center shadow-2xl"
          >
            <p className="eyebrow text-pine/60">Trước khi bắt đầu</p>
            <h3 className="font-serif text-2xl text-pine">
              Nhập tên người chơi
            </h3>
            <p className="text-sm text-ink/70">
              Kết quả của bạn sẽ được lưu lại cùng thời gian làm bài.
            </p>
            <input
              value={nameInput}
              onChange={(event) => setNameInput(event.target.value)}
              placeholder="Ví dụ: Nguyễn Văn A"
              className="w-full rounded-2xl border border-bamboo/50 px-4 py-3 text-sm focus:border-lotus focus:outline-none"
            />
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="w-full rounded-full border border-bamboo/50 px-5 py-3 text-sm font-semibold uppercase tracking-widest text-pine transition hover:border-lotus/40 hover:text-lotus"
                onClick={() => navigate('/')}
              >
                Quay lại
              </button>
              <button
                type="submit"
                className="w-full rounded-full bg-lotus px-5 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow-lg shadow-lotus/40 transition hover:bg-lotus/90"
              >
                Bắt đầu
              </button>
            </div>
          </form>
        </div>
      )}

      {isNameConfirmed && currentQuestion && (
        <>
          <SectionHeading
            eyebrow="Trắc nghiệm nhanh"
            title="Bạn hiểu gì về phong cách giản dị?"
            description="Chọn câu trả lời đúng nhất. Sau khi nộp bài, bạn sẽ thấy lời giải thích để áp dụng vào cuộc sống hàng ngày."
          />

          <article className="paper-card space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-pine/70">
                  {currentQuestion.chapterName}
                </p>
                <h3 className="text-xl font-semibold text-pine">
                  {currentQuestion.context}
                </h3>
              </div>
              <span className="rounded-full border border-bamboo/50 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-pine/70">
                Câu {currentIndex + 1}/{questions.length}
              </span>
            </div>
            <p className="text-lg font-semibold text-ink">
              {currentQuestion.question}
            </p>
            <div className="grid gap-3 md:grid-cols-3">
              {currentQuestion.answers.map((answer) => (
                <button
                  key={answer.text}
                  type="button"
                  className="rounded-2xl border border-bamboo/40 bg-white/70 px-4 py-4 text-left text-ink/80 transition hover:border-pine/40 hover:text-pine"
                  onClick={() => handleAnswer(answer)}
                  disabled={isFinished || hasAnswered}
                >
                  <p className="font-semibold">{answer.text}</p>
                </button>
              ))}
            </div>
            {lastResult && (
              <div
                className={`space-y-3 rounded-2xl border px-4 py-4 text-sm ${lastResult === 'correct'
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                  : 'border-rose-200 bg-rose-50 text-rose-600'
                  }`}
              >
                <p className="font-semibold">
                  {lastResult === 'correct'
                    ? 'Bạn trả lời đúng.'
                    : 'Bạn trả lời sai.'}
                </p>
                <p>
                  Điểm bị trừ:{' '}
                  <span className="font-semibold">
                    {lastPenalty ?? 0}
                  </span>
                </p>
                {selectedAnswer && (
                  <p className="text-xs text-ink/70">
                    Bạn đã chọn: {selectedAnswer.text}
                  </p>
                )}
                {points > 0 && !isFinished && hasAnswered && (
                  <button
                    type="button"
                    className="rounded-full bg-pine px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-pine/90"
                    onClick={handleNextQuestion}
                  >
                    {currentIndex >= questions.length - 1
                      ? 'Hoàn tất'
                      : 'Câu tiếp theo'}
                  </button>
                )}
              </div>
            )}
          </article>

          <div className="flex flex-col items-center gap-4 rounded-3xl border border-bamboo/40 bg-pine/95 px-6 py-6 text-center text-white shadow-parchment sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-bamboo/80">
                Vốn còn lại
              </p>
              <p className="text-3xl font-semibold">
                {points} điểm
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-bamboo/70">
                {playerName ? `Người chơi: ${playerName}` : 'Chưa nhập tên'}
              </p>
              {elapsedTime !== null && (
                <p className="mt-1 text-xs text-bamboo/80">
                  Thời gian hoàn thành: {elapsedTime}s
                </p>
              )}
              <p className="mt-1 text-xs text-bamboo/70">
                Lượt chơi: {attempts}
              </p>
            </div>
            {isFinished && (
              <div className="space-y-2 text-sm">
                <p className="text-bamboo/80">
                  Ván chơi đã kết thúc.
                </p>
                {posted && (
                  <p className="text-emerald-200">
                    Đã lưu kết quả lên bảng xếp hạng.
                  </p>
                )}
                {postError && (
                  <p className="text-rose-200">{postError}</p>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  )
}
