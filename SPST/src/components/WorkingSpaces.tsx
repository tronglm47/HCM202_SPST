import { SectionHeading } from './SectionHeading'

const spaces = [
  {
    title: 'Nhà sàn đơn sơ',
    detail:
      'Không sơn son thếp vàng, chỉ vài món đồ gỗ mộc mạc. Đây là nơi Bác tiếp khách quốc tế với nụ cười hiền hòa.',
    imageAlt: 'Nhà sàn của Chủ tịch Hồ Chí Minh ở Phủ Chủ tịch',
    imageSrc:
      'https://file.qdnd.vn/data/images/0/2018/05/11/vuhuyen/2642018huyen31jpg.jpg?w=578',
  },
  {
    title: 'Phòng làm việc nhỏ',
    detail:
      'Bàn gỗ, chiếc máy chữ cổ và đèn dầu. Tất cả hồ sơ được sắp xếp gọn ghẽ, phản ánh phong thái kỷ luật.',
    imageAlt: 'Phòng làm việc của Bác Hồ với bàn gỗ và máy chữ',
    imageSrc:
      'https://bhd.1cdn.vn/2024/09/03/i1-vnexpress.vnecdn.net-2024-08-26-_10-1724667589.jpg',
  },
  {
    title: 'Vườn cây & Ao cá',
    detail:
      'Giờ nghỉ, Người đi dạo quanh vườn, tự tay chăm sóc từng gốc bưởi, cho cá ăn và trò chuyện với bảo vệ.',
    imageAlt: 'Ao cá Bác Hồ với màu xanh mướt mắt',
    imageSrc:
      'https://mia.vn/media/uploads/blog-du-lich/ao-ca-bac-ho-6-1743615897.jpg',
  },
]

export function WorkingSpaces() {
  return (
    <section className="section-shell space-y-12">
      <SectionHeading
        eyebrow="Không gian sống"
        title="Những góc bình yên quanh Bác"
        description="Mỗi góc nhỏ ở Phủ Chủ tịch đều mang hơi thở của sự giản dị, đậm nét văn hóa Việt"
      />

      <div className="grid gap-8 lg:grid-cols-3">
        {spaces.map((space) => (
          <article key={space.title} className="paper-card flex flex-col gap-4">
            <figure className="relative overflow-hidden rounded-2xl border border-bamboo/40 bg-white/70">
              <img
                src={space.imageSrc}
                alt={space.imageAlt}
                className="h-48 w-full object-cover"
                loading="lazy"
              />
            </figure>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-pine">{space.title}</h3>
              <p className="text-sm text-ink/80">{space.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
