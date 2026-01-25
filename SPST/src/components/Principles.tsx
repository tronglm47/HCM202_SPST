import { SectionHeading } from './SectionHeading'

const principles = [
  {
    title: 'Tối giản nhưng tinh tế',
    detail:
      'Tư trang của Bác chỉ vài bộ áo kaki, đôi dép cao su, chiếc quạt mo - vừa đủ cho công việc bận rộn nhưng luôn sạch sẽ ngăn nắp.',
  },
  {
    title: 'Ưu tiên sức khỏe và tự học',
    detail:
      'Mỗi sáng Người luyện tập thể dục, đọc báo, ghi chép chi tiết. Thói quen này giúp Bác duy trì trí tuệ minh mẫn suốt nhiều thập kỷ.',
  },
  {
    title: 'Cần - Kiệm - Liêm - Chính',
    detail:
      'Bác nói “một đồng, một hạt gạo của nhân dân đều đáng quý”. Từ bữa ăn đến việc sử dụng thời gian, tất cả đều đo bằng lợi ích của dân.',
  },
]

export function Principles() {
  return (
    <section className="section-shell space-y-10">
      <SectionHeading
        eyebrow="Giá trị cốt lõi"
        title="Phong cách sống giản dị"
        description="Ba lớp ý nghĩa tạo nên phong thái Hồ Chí Minh: sống tối giản, tự rèn luyện và đặt trách nhiệm với nhân dân lên hàng đầu."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {principles.map((principle) => (
          <article key={principle.title} className="paper-card space-y-4">
            <h3 className="font-serif text-2xl text-pine">{principle.title}</h3>
            <p className="text-sm leading-relaxed text-ink/80">
              {principle.detail}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
