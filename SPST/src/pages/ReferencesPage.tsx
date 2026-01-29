import { SectionHeading } from '../components/SectionHeading'
import { Footer } from '../components/Footer'

export function ReferencesPage() {
  const notebookLmUrl = 'https://media.licdn.com/dms/image/v2/D4E22AQFE-2b_cINqaA/feedshare-shrink_800/B4EZhm_JHyHIAk-/0/1754074485601?e=2147483647&v=beta&t=8phLRCRsF_dsD4vDtvKPsahYm8ii1bHrCkwVmiuzTBI'
  const gptUrl = 'https://images.seeklogo.com/logo-png/46/1/chatgpt-logo-png_seeklogo-465219.png'
  const stitchUrl = 'https://learnai.tw/wp-content/uploads/2025/06/Google-Stitch-Logo.png'

  return (
    <div className="min-h-screen bg-parchment px-4 pb-8 pt-4 sm:px-8 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <SectionHeading
          eyebrow="Nguồn tham khảo"
          title="Tham khảo & Công cụ hỗ trợ"
          description="Tổng hợp tài liệu, video và các công cụ AI đã hỗ trợ trong quá trình xây dựng nội dung và giao diện."
        />

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-bamboo/20 bg-white/80 p-5 shadow-lg shadow-bamboo/10">
            <h3 className="text-lg font-semibold text-pine">Video tham khảo</h3>
            <ul className="mt-4 space-y-4 text-sm text-ink/70">
              <li className="flex flex-col gap-2 rounded-2xl border border-bamboo/15 bg-parchment/60 p-4">
                <span className="font-medium text-ink">
                  Những câu chuyện sinh hoạt đời thường của Bác | Kể Chuyện Về Bác Hồ Đài Tiếng Nói Việt Nam VOV 650
                </span>
                <a
                  className="text-lotus underline decoration-lotus/40 underline-offset-4"
                  href="https://www.youtube.com/watch?v=n2T8FOtk4bI"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://www.youtube.com/watch?v=n2T8FOtk4bI
                </a>
              </li>
              <li className="flex flex-col gap-2 rounded-2xl border border-bamboo/15 bg-parchment/60 p-4">
                <span className="font-medium text-ink">
                  Đồng chí Vũ Kỳ kể về ngày làm việc của Bác, tinh thần đoàn kết của Người (Trả lời phỏng vấn phần 1)
                </span>
                <a
                  className="text-lotus underline decoration-lotus/40 underline-offset-4"
                  href="https://www.youtube.com/watch?v=FJ7cEQvjUws"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://www.youtube.com/watch?v=FJ7cEQvjUws
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-bamboo/20 bg-white/80 p-5 shadow-lg shadow-bamboo/10">
            <h3 className="text-lg font-semibold text-pine">Công cụ AI hỗ trợ</h3>
            <div className="mt-4 grid gap-4">
              <div className="rounded-2xl border border-bamboo/15 bg-parchment/60 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-ink">NotebookLM</p>
                    <p className="mt-1 text-sm text-ink/70">
                      Tra cứu nội dung học phần Tư tưởng Hồ Chí Minh và tổng hợp ghi chú.
                    </p>
                  </div>
                  <div className="flex items-center justify-center rounded-xl border border-dashed border-bamboo/50 bg-white/70 p-2 text-xs text-ink/40 shadow-sm shadow-bamboo/10">
                    {notebookLmUrl ? (
                      <img
                        src={notebookLmUrl}
                        alt="NotebookLM"
                        className="h-auto w-auto max-h-20 max-w-24 object-contain"
                      />
                    ) : (
                      'Khung ảnh'
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-bamboo/15 bg-parchment/60 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-ink">GPT-5.2-Codex</p>
                    <p className="mt-1 text-sm text-ink/70">
                      Hỗ trợ tạo nội dung và cấu trúc giao diện cho trang web.
                    </p>
                  </div>
                  <div className="flex items-center justify-center rounded-xl border border-dashed border-bamboo/50 bg-white/70 p-2 text-xs text-ink/40 shadow-sm shadow-bamboo/10">
                    {gptUrl ? (
                      <img
                        src={gptUrl}
                        alt="GPT-5.2-Codex"
                        className="h-auto w-auto max-h-20 max-w-24 object-contain"
                      />
                    ) : (
                      'Khung ảnh'
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-bamboo/15 bg-parchment/60 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-ink">Stitch with Google</p>
                    <p className="mt-1 text-sm text-ink/70">
                      Phác thảo giao diện, bố cục và gợi ý phong cách thẩm mỹ.
                    </p>
                  </div>
                  <div className="flex items-center justify-center rounded-xl border border-dashed border-bamboo/50 bg-white/70 p-2 text-xs text-ink/40 shadow-sm shadow-bamboo/10">
                    {stitchUrl ? (
                      <img
                        src={stitchUrl}
                        alt="Stitch with Google"
                        className="h-auto w-auto max-h-20 max-w-24 object-contain"
                      />
                    ) : (
                      'Khung ảnh'
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}
