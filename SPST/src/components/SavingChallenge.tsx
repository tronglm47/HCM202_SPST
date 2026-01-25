import { SectionHeading } from './SectionHeading'

const weekPlan = [
  {
    day: 'Ngày 1',
    focus: 'Dọn góc làm việc',
    action:
      'Loại bỏ vật dụng không cần thiết, dành hộp riêng cho tài liệu quan trọng như cách Bác luôn gọn gàng, ngăn nắp.',
  },
  {
    day: 'Ngày 2',
    focus: 'Bữa ăn tiết kiệm',
    action:
      'Chuẩn bị thực đơn đơn giản, ưu tiên rau củ địa phương. Ghi lại chi phí để thấy giá trị của sự giản dị.',
  },
  {
    day: 'Ngày 3',
    focus: 'Tắt thiết bị không dùng',
    action:
      'Giảm tiêu thụ điện bằng cách tắt đèn, quạt khi rời phòng. Ghi chú chỉ số điện để so sánh cuối tuần.',
  },
  {
    day: 'Ngày 4',
    focus: 'Chia sẻ kiến thức',
    action:
      'Dành ít nhất 30 phút đọc sách rồi ghi lại điều tâm đắc giống như nhật ký công tác của Bác.',
  },
  {
    day: 'Ngày 5',
    focus: 'Quỹ “một đồng tiết kiệm”',
    action:
      'Đặt một chiếc hũ nhỏ, bỏ vào đó khoản tiết kiệm được hôm nay. Dùng quỹ để giúp một người bạn hoặc hoạt động cộng đồng.',
  },
  {
    day: 'Ngày 6',
    focus: 'Gặp gỡ và lắng nghe',
    action:
      'Trò chuyện với người thân, hỏi họ cần hỗ trợ điều gì và ghi chú lại. Bác luôn dành thời gian tiếp dân mỗi ngày.',
  },
  {
    day: 'Ngày 7',
    focus: 'Tổng kết & tri ân',
    action:
      'Viết một lá thư cảm ơn gửi đến người truyền cảm hứng cho bạn. Tự đánh giá tuần sống giản dị đã mang lại điều gì.',
  },
]

export function SavingChallenge() {
  return (
    <section
      id="challenge"
      className="section-shell space-y-12 scroll-mt-24 bg-white/90"
    >
      <SectionHeading
        eyebrow="Thử thách 1 tuần"
        title="Sống tiết kiệm theo gợi ý của Bác"
        description="Mỗi ngày là một hành động nhỏ giúp nuôi dưỡng lối sống giản dị. Hoàn thành đủ 7 ngày, bạn sẽ có một câu chuyện thực tế để chia sẻ trên lớp."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {weekPlan.map((day, index) => (
          <article
            key={day.day}
            className="paper-card relative overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-lotus via-bamboo to-pine" />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-pine/70">
                  {day.day}
                </p>
                <h3 className="text-2xl font-serif text-pine">{day.focus}</h3>
              </div>
              <span className="rounded-full border border-bamboo/40 px-3 py-1 text-xs font-semibold text-lotus">
                Ngày {index + 1}/7
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink/80">
              {day.action}
            </p>
          </article>
        ))}
      </div>

      <div className="rounded-4xl border border-pine/20 bg-pine/95 px-6 py-8 text-white shadow-xl shadow-pine/30">
        <h4 className="font-serif text-2xl">Nhật ký phản tư</h4>
        <p className="mt-2 text-sm text-bamboo">
          Mỗi tối viết ba dòng: hôm nay bạn tiết kiệm được gì, học được điều gì,
          và bạn muốn gửi lời tri ân đến ai. Đây chính là “bài tập về nhà” của
          thử thách.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-bamboo/80">
          <span className="rounded-full border border-bamboo/60 px-3 py-1">
            Kỷ luật
          </span>
          <span className="rounded-full border border-bamboo/60 px-3 py-1">
            Tự giác
          </span>
          <span className="rounded-full border border-bamboo/60 px-3 py-1">
            Cộng đồng
          </span>
        </div>
      </div>
    </section>
  )
}
