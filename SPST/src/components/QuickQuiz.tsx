import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SectionHeading } from './SectionHeading'
import quizJson from '../quiz.json'

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

const legacyQuizData = {
  chapters: [
    {
      chapter_id: 1,
      chapter_name: 'SINH HOẠT CÁ NHÂN',
      questions: [
        {
          id: 1,
          context: 'Bữa sáng',
          question: 'Bạn sẽ chọn bữa sáng nào để bắt đầu ngày làm việc?',
          options: [
            { text: 'A. Phở bò đặc biệt, cà phê ngoại' },
            { text: 'B. Cơm nguội, cà muối, trà nóng', is_correct: true },
            { text: 'C. Bánh mì bơ sữa phục vụ tận phòng' },
          ],
        },
        {
          id: 2,
          context: 'Trang phục',
          question:
            'Bộ quần áo kaki của bạn đã sờn vai và cổ áo đã cũ, bạn xử lý thế nào?',
          options: [
            { text: 'A. May bộ mới tương tự để giữ hình ảnh lãnh tụ' },
            {
              text: 'B. Lộn ngược cổ áo lại, vá chỗ sờn để dùng tiếp',
              is_correct: true,
            },
            { text: 'C. Chỉ dùng bộ cũ khi tiếp dân, dùng bộ mới khi họp' },
          ],
        },
        {
          id: 3,
          context: 'Chỗ ở',
          question:
            'Khi về Thủ đô, bạn được sắp xếp ở trong Phủ Toàn quyền sang trọng, bạn quyết định ra sao?',
          options: [
            { text: 'A. Ở lại để thuận tiện tiếp khách quốc tế' },
            {
              text: 'B. Chọn ở ngôi nhà nhỏ của người thợ điện trong vườn',
              is_correct: true,
            },
            { text: 'C. Cải tạo các phòng lớn thành phòng làm việc chung' },
          ],
        },
        {
          id: 4,
          context: 'Vật dụng',
          question:
            'Đôi dép cao su của bạn đã mòn vẹt quai, các đồng chí muốn thay đôi mới, bạn nói gì?',
          options: [
            { text: 'A. Chấp thuận vì đôi cũ không còn đảm bảo an toàn' },
            {
              text: 'B. Đóng thêm đinh vào quai để tận dụng tiếp',
              is_correct: true,
            },
            { text: 'C. Giữ làm kỷ niệm và mua một đôi giày vải' },
          ],
        },
        {
          id: 5,
          context: 'Di chuyển',
          question:
            'Trên đường công tác xa, xe ô tô xóc mạnh do đường xấu, bạn xử lý thế nào?',
          options: [
            { text: 'A. Yêu cầu cấp xe có hệ thống giảm xóc tốt hơn' },
            {
              text: 'B. Xuống đi bộ cùng anh em để rèn luyện và tiết kiệm xăng',
              is_correct: true,
            },
            { text: 'C. Nhắc nhở địa phương sớm tu sửa con đường này' },
          ],
        },
        {
          id: 6,
          context: 'Văn phòng phẩm',
          question:
            'Khi viết bản thảo hoặc thư tay, bạn chọn loại giấy nào để sử dụng?',
          options: [
            { text: 'A. Giấy chuyên dụng có in tiêu đề phủ' },
            {
              text: 'B. Tận dụng mặt sau của bản tin cũ hoặc giấy nháp',
              is_correct: true,
            },
            { text: 'C. Giấy trắng khổ tiêu chuẩn để dễ lưu trữ' },
          ],
        },
        {
          id: 7,
          context: 'Quà biếu',
          question:
            'Nhân dân các địa phương gửi biếu nhiều đặc sản quý hiếm, bạn sẽ làm gì?',
          options: [
            { text: 'A. Nhận và viết thư cảm ơn chân thành đến bà con' },
            {
              text: 'B. Gửi tặng lại cho các trại nhi đồng hoặc thương binh',
              is_correct: true,
            },
            { text: 'C. Nhận một phần nhỏ, còn lại gửi trả lại dân' },
          ],
        },
        {
          id: 8,
          context: 'Trang trí ngày Tết',
          question:
            'Dịp Tết Nguyên đán, bạn chỉ thị việc trang trí nơi ở và làm việc ra sao?',
          options: [
            { text: 'A. Trang hoàng rực rỡ để tạo không khí phấn khởi' },
            {
              text: 'B. Chỉ một cành đào nhỏ, dành tiền tặng quà cho người nghèo',
              is_correct: true,
            },
            {
              text: 'C. Giữ nguyên trạng như ngày thường để tránh lãng phí',
            },
          ],
        },
        {
          id: 9,
          context: 'Nghỉ ngơi khi đi công tác',
          question: 'Khi đi thăm địa phương vào ban đêm, bạn chọn nghỉ chân ở đâu?',
          options: [
            { text: 'A. Nhà khách của UBND tỉnh để đảm bảo an ninh' },
            {
              text: 'B. Nghỉ tại nhà dân hoặc trụ sở xã đơn sơ',
              is_correct: true,
            },
            { text: 'C. Ngủ lại trên xe để sáng sớm đi làm ngay' },
          ],
        },
        {
          id: 10,
          context: 'Sử dụng điện',
          question:
            'Rời phòng làm việc thấy đèn vẫn sáng dù trời đã tỏ, bạn hành động thế nào?',
          options: [
            { text: 'A. Nhắc nhở đồng chí giúp việc lần sau chú ý hơn' },
            {
              text: 'B. Tự tay tắt điện và duy trì thói quen này mỗi ngày',
              is_correct: true,
            },
            { text: 'C. Yêu cầu lắp cảm biến ánh sáng để tự động hóa' },
          ],
        },
      ],
    },
    {
      chapter_id: 2,
      chapter_name: 'CÔNG TÁC NGOẠI GIAO & TRỊ QUỐC',
      questions: [
        {
          id: 11,
          context: 'Chiêu đãi ngoại giao',
          question:
            'Khi tiếp đón các nguyên thủ quốc gia, thực đơn tiệc chiêu đãi nên là gì?',
          options: [
            { text: 'A. Những món đắt tiền nhất để thể hiện sự tôn trọng' },
            {
              text: 'B. Món ăn dân tộc giản dị, đậm đà bản sắc Việt',
              is_correct: true,
            },
            {
              text: 'C. Các món Âu - Á kết hợp theo tiêu chuẩn quốc tế',
            },
          ],
        },
        {
          id: 12,
          context: 'Khen thưởng cán bộ',
          question:
            'Để động viên một cán bộ vừa lập công lớn, bạn chọn món quà nào?',
          options: [
            { text: 'A. Một khoản tiền thưởng lớn để cải thiện đời sống' },
            {
              text: 'B. Một cuốn sổ tay hoặc chiếc bút máy kèm lời ghi tên',
              is_correct: true,
            },
            { text: 'C. Đề bạt thẳng lên vị trí cao hơn ngay lập tức' },
          ],
        },
        {
          id: 13,
          context: 'Tác phong đón tiếp',
          question:
            'Thấy địa phương trải thảm đỏ và huy động học sinh đứng nắng đón mình, bạn xử lý sao?',
          options: [
            { text: 'A. Nhanh chóng đi qua để các cháu sớm được nghỉ' },
            {
              text: 'B. Cuộn thảm lại, yêu cầu các cháu vào chỗ mát rồi mới nói chuyện',
              is_correct: true,
            },
            {
              text: 'C. Nghiêm khắc phê bình cán bộ tỉnh ngay tại chỗ',
            },
          ],
        },
        {
          id: 14,
          context: 'Xử lý quà tặng công vụ',
          question:
            'Một đoàn ngoại giao tặng bạn chiếc xe hơi đời mới, bạn quyết định thế nào?',
          options: [
            { text: 'A. Nhận để làm phương tiện đưa đón khách quốc tế' },
            {
              text: 'B. Giao cho bộ phận hậu cần dùng chung, bản thân vẫn dùng xe cũ',
              is_correct: true,
            },
            { text: 'C. Từ chối thẳng thừng để giữ tiếng thanh liêm' },
          ],
        },
        {
          id: 15,
          context: 'Công tâm trong dùng người',
          question:
            'Người thân ở quê ra nhờ bạn xin cho một công việc tốt ở cơ quan nhà nước, bạn nói gì?',
          options: [
            { text: 'A. Hướng dẫn họ nộp hồ sơ theo đúng quy trình' },
            {
              text: 'B. Giải thích rằng việc công không thể xen việc tư và từ chối',
              is_correct: true,
            },
            { text: 'C. Giới thiệu sang một cơ quan khác để tránh tiếng' },
          ],
        },
        {
          id: 16,
          context: 'Tiếp dân',
          question:
            'Có người dân muốn gặp trực tiếp để phản ánh nỗi oan sai, nhưng bạn đang có lịch họp, bạn làm gì?',
          options: [
            { text: 'A. Yêu cầu ban tiếp dân giải quyết triệt để' },
            {
              text: 'B. Tạm hoãn họp hoặc dành giờ nghỉ để trực tiếp lắng nghe dân',
              is_correct: true,
            },
            { text: 'C. Hẹn dân vào một ngày khác khi lịch trình trống' },
          ],
        },
        {
          id: 17,
          context: 'Phân bổ ngân sách',
          question:
            'Chính phủ có nguồn thu mới, ý kiến đề xuất nâng cấp nội thất công sở, bạn quyết định ra sao?',
          options: [
            { text: 'A. Đồng ý một phần cho những nơi quá xập xệ' },
            {
              text: 'B. Ưu tiên dồn lực cho quỹ xóa mù chữ và phát triển nông nghiệp',
              is_correct: true,
            },
            { text: 'C. Đầu tư vào công nghệ hiện đại cho các bộ ngành' },
          ],
        },
        {
          id: 18,
          context: 'Kỷ luật thời gian',
          question:
            'Trong một buổi họp quan trọng, bạn thấy nhiều đại biểu đi muộn, bạn sẽ làm gì?',
          options: [
            {
              text: 'A. Phê bình chung cuối buổi họp để giữ thể diện cho họ',
            },
            {
              text: 'B. Bắt đầu đúng giờ và nhắc nhở giá trị của thời gian đối với dân',
              is_correct: true,
            },
            {
              text: 'C. Cho thư ký ghi tên những người muộn để trừ lương',
            },
          ],
        },
        {
          id: 19,
          context: 'Đối mặt với khó khăn dân tộc',
          question:
            'Khi đất nước đang gặp nạn đói, bạn kêu gọi toàn dân nhịn ăn cứu đói, bản thân bạn sẽ làm gì?',
          options: [
            { text: 'A. Quyên góp tiền lương của cả năm' },
            {
              text: 'B. Thực hiện đúng mỗi tuần nhịn ăn một bữa để góp gạo',
              is_correct: true,
            },
            { text: 'C. Ra lệnh kiểm soát chặt chẽ các kho lương' },
          ],
        },
        {
          id: 20,
          context: 'Phong thái diễn thuyết',
          question:
            'Khi trình bày một chính sách mới trước nhân dân, bạn chọn cách diễn đạt nào?',
          options: [
            { text: 'A. Phân tích số liệu và lý luận chính trị sắc bén' },
            {
              text: 'B. Dùng lời lẽ bình dân, ví dụ cụ thể như câu chuyện gia đình',
              is_correct: true,
            },
            { text: 'C. Đọc văn bản đã được chuẩn bị bởi đội ngũ chuyên gia' },
          ],
        },
      ],
    },
  ],
}

const quizData = quizJson

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

  const questions = useMemo<QuizQuestion[]>(() => {
    return quizData.chapters.flatMap((chapter) =>
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
    finalPoints: number,
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
    await postResult(durationSeconds, finalAttempts, finalPoints)
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
                className={`space-y-3 rounded-2xl border px-4 py-4 text-sm ${
                  lastResult === 'correct'
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
