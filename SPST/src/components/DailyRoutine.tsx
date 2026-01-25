import { SectionHeading } from './SectionHeading'

const routine = [
  {
    time: '05:30',
    title: 'Thức dậy khi trời chưa sáng',
    detail:
      'Mặt trời chưa mọc, chim chưa hót thì Bác đã dậy. Sau đó tập thể dục khoảng 10 phút và đi bách bộ trước khi ăn sáng.',
  },
  {
    time: '06:30',
    title: 'Bắt đầu buổi làm việc',
    detail:
      'Ngồi vào bàn làm việc: xem báo đài, báo Nhân Dân và các báo khác; nghe báo cáo kế hoạch trong ngày, việc cần dặn trong tuần.',
  },
  {
    time: 'Buổi sáng',
    title: 'Tự nghiên cứu tài liệu',
    detail:
      'Nếu không họp hoặc đi thăm, Bác ngồi một mình đọc báo cáo, xem tài liệu để chuẩn bị các quyết định quan trọng.',
  },
  {
    time: 'Trưa',
    title: 'Nghỉ dưới nhà sàn',
    detail:
      'Sau khi ăn cơm, Bác nghỉ khoảng 30 phút dưới nhà sàn rồi dậy tiếp tục làm việc.',
  },
  {
    time: 'Chiều',
    title: 'Làm việc với các đoàn báo cáo',
    detail:
      'Cán bộ, các bộ, trung ương và Quốc hội đến báo cáo công việc. Bác lắng nghe, góp ý và định hướng.',
  },
  {
    time: '18:30',
    title: 'Làm việc buổi tối',
    detail:
      'Sau bữa cơm tối, Bác bắt đầu làm việc. Đồng chí Vũ Kỳ đọc tin tức, báo chí để Bác cập nhật tình hình.',
  },
  {
    time: '21:00 - 23:00',
    title: 'Đọc sách và nghỉ ngơi',
    detail:
      'Khoảng 21:00 Bác bắt đầu nghỉ, vẫn đọc sách đến 23:00. Khi Đài Tiếng nói Việt Nam tắt, Bác mới tắt đèn đi ngủ.',
  },
]

export function DailyRoutine() {
  return (
    <section className="section-shell space-y-12">
      <SectionHeading
        eyebrow="Lịch sinh hoạt"
        title="Một ngày làm việc của Bác Hồ"
        description="Tổng hợp theo lời kể của đồng chí Vũ Kỳ: lịch làm việc kỷ luật, khoa học và bền bỉ từ sáng sớm đến khuya."
        singleLineDescription
      />

      <div className="relative">
        <div className="space-y-8">
          {routine.map((item, idx) => (
            <article
              key={`${item.time}-${item.title}`}
              className="timeline-card group"
              style={{ animationDelay: `${idx * 120}ms` }}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-lotus">{item.time}</p>
                  <h3 className="text-xl font-semibold text-pine">
                    {item.title}
                  </h3>
                </div>
              </div>
              <p className="text-base leading-relaxed text-ink/75">
                {item.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
