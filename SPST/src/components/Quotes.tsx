import { SectionHeading } from './SectionHeading'

const quotes = [
  {
    text: 'Chúng ta sống đơn giản để dành điều tốt đẹp nhất cho đồng bào.',
    source: 'Bác Hồ viết cho cán bộ Phủ Chủ tịch',
  },
  {
    text: 'Việc gì có lợi cho dân phải hết sức làm, việc gì hại đến dân phải hết sức tránh.',
    source: 'Trích “Đạo đức cách mạng”, 1958',
  },
  {
    text: 'Một dân tộc, một đảng và mỗi con người, ngày hôm qua là vĩ đại nhưng ngày hôm nay nếu không cố gắng sẽ trở nên tầm thường.',
    source: 'Thư gửi Ủy ban hành chính các cấp, 1965',
  },
]

export function Quotes() {
  return (
    <section className="section-shell space-y-12">
      <SectionHeading
        eyebrow="Thông điệp"
        title="Lời nhắc nhở từ Bác"
        description="Những câu nói quen thuộc nhưng luôn mới, khuyến khích mỗi chúng ta sống giản dị, tận tụy và học tập suốt đời."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {quotes.map((quote) => (
          <figure
            key={quote.text}
            className="paper-card flex flex-col justify-between gap-4"
          >
            <blockquote className="font-serif text-lg text-ink">
              “{quote.text}”
            </blockquote>
            <figcaption className="text-sm uppercase tracking-widest text-ink/60">
              {quote.source}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
