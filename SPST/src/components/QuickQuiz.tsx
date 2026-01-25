import { useMemo, useState } from 'react'
import { SectionHeading } from './SectionHeading'

type AnswerOption = {
  text: string
  correct: boolean
}

type QuizQuestion = {
  question: string
  answers: AnswerOption[]
  insight: string
}

const questions: QuizQuestion[] = [
  {
    question: 'Vì sao Bác Hồ luôn giữ bữa ăn đạm bạc dù là Chủ tịch nước?',
    insight:
      'Bữa ăn giản dị nhắc nhở Người và mọi cán bộ phải tiết kiệm, không quên gốc rễ nhân dân.',
    answers: [
      { text: 'Vì không có thời gian chuẩn bị', correct: false },
      {
        text: 'Để chia sẻ khó khăn với đồng bào và giữ tinh thần tiết kiệm',
        correct: true,
      },
      { text: 'Do yêu cầu của bác sĩ', correct: false },
    ],
  },
  {
    question: 'Thói quen buổi sáng nào thể hiện tinh thần tự học của Bác?',
    insight:
      'Mỗi bình minh Người đọc báo, ghi chú ngoại ngữ, rèn trí tuệ trước khi bắt đầu công việc.',
    answers: [
      { text: 'Chạy bộ quanh ao cá', correct: false },
      { text: 'Đọc báo, ghi chép và soạn thảo', correct: true },
      { text: 'Ngủ thêm để lấy sức', correct: false },
    ],
  },
  {
    question: 'Câu nói nào thể hiện rõ phong cách sống giản dị của Bác?',
    insight:
      'Thông điệp “việc gì lợi cho dân” là kim chỉ nam cho mọi quyết định của Người.',
    answers: [
      {
        text: '“Việc gì có lợi cho dân phải hết sức làm.”',
        correct: true,
      },
      { text: '“Phải hưởng thụ trước để làm gương.”', correct: false },
      { text: '“Mọi quyết định đều do cá nhân tôi chịu trách nhiệm.”', correct: false },
    ],
  },
]

export function QuickQuiz() {
  const [responses, setResponses] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const score = useMemo(() => {
    return questions.reduce((total, question, index) => {
      const selected = responses[index]
      if (selected === undefined) return total
      return question.answers[selected]?.correct ? total + 1 : total
    }, 0)
  }, [responses])

  const allAnswered = Object.keys(responses).length === questions.length

  return (
    <section
      id="quiz"
      className="section-shell space-y-10 scroll-mt-24 bg-white/85"
    >
      <SectionHeading
        eyebrow="Trắc nghiệm nhanh"
        title="Bạn hiểu gì về phong cách giản dị?"
        description="Chọn câu trả lời đúng nhất. Sau khi nộp bài, bạn sẽ thấy lời giải thích để áp dụng vào cuộc sống hàng ngày."
      />

      <div className="space-y-6">
        {questions.map((question, questionIndex) => (
          <article key={question.question} className="paper-card space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-pine/70">
                  Câu hỏi {questionIndex + 1}
                </p>
                <h3 className="text-lg font-semibold text-pine">
                  {question.question}
                </h3>
              </div>
              {submitted && (
                <span className="rounded-full border border-lotus/40 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-lotus">
                  {responses[questionIndex] !== undefined &&
                  question.answers[responses[questionIndex]]?.correct
                    ? 'Chính xác'
                    : 'Cần suy ngẫm'}
                </span>
              )}
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {question.answers.map((answer, answerIndex) => {
                const isSelected = responses[questionIndex] === answerIndex
                const showCorrect =
                  submitted && answer.correct && isSelected === false
                const baseClasses =
                  'rounded-2xl border px-4 py-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-lotus/60'

                let stateClasses =
                  'border-bamboo/40 bg-white/70 text-ink/80 hover:border-pine/40 hover:text-pine'

                if (isSelected) {
                  stateClasses = answer.correct
                    ? 'border-lotus bg-lotus/10 text-lotus shadow-inner'
                    : 'border-lotus/50 bg-lotus/5 text-lotus'
                } else if (showCorrect) {
                  stateClasses = 'border-pine bg-pine/10 text-pine'
                }

                return (
                  <button
                    key={answer.text}
                    type="button"
                    className={`${baseClasses} ${stateClasses}`}
                    onClick={() => {
                      setResponses((prev) => ({
                        ...prev,
                        [questionIndex]: answerIndex,
                      }))
                      setSubmitted(false)
                    }}
                  >
                    <p className="font-semibold">{answer.text}</p>
                  </button>
                )
              })}
            </div>

            {submitted && (
              <p className="rounded-2xl border border-bamboo/30 bg-parchment/60 px-4 py-3 text-sm text-ink/80">
                {question.insight}
              </p>
            )}
          </article>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 rounded-3xl border border-bamboo/40 bg-pine/95 px-6 py-6 text-center text-white shadow-parchment sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-bamboo/80">
            Điểm số của bạn
          </p>
          <p className="text-3xl font-semibold">
            {submitted ? `${score} / ${questions.length}` : 'Chưa nộp bài'}
          </p>
        </div>
        <button
          type="button"
          className="rounded-full bg-lotus px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow-lg shadow-lotus/40 transition hover:bg-lotus/90 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={!allAnswered}
          onClick={() => setSubmitted(true)}
        >
          Nộp bài
        </button>
        {!allAnswered && (
          <p className="text-xs text-bamboo/70">
            Chọn câu trả lời cho mọi câu hỏi trước khi nộp.
          </p>
        )}
      </div>
    </section>
  )
}
