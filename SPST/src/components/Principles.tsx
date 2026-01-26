import { SectionHeading } from './SectionHeading'
import depBacHo from '../assets/depBacHo.png'
import aoBacHo from '../assets/aoBacHo.png'
import BacHoghichep from '../assets/BacHoghichep.png'
import BacHonoichuyenvoimoinguoi from '../assets/BacHonoichuyenvoimoinguoi.png'

const principles = [
  {
    title: 'Tối giản nhưng tinh tế',
    detail:
      'Tư trang của Bác chỉ vài bộ áo kaki, đôi dép cao su, chiếc quạt mo vừa đủ cho công việc bận rộn nhưng luôn sạch sẽ ngăn nắp.',
    images: [
      {
        alt: 'Đôi dép cao su gắn liền với phong cách giản dị của Bác',
        src: depBacHo,
        sizeClass: 'h-64 sm:h-50',
        offsetClass: 'translate-y-4 sm:translate-y-6',
      },
      {
        alt: 'Áo kaki giản dị của Bác Hồ',
        src: aoBacHo,
        sizeClass: 'h-120 sm:h-120',
        offsetClass: 'translate-y-10 sm:translate-y-12',
      },
    ],
  },
  {
    title: 'Ưu tiên sức khỏe và tự học',
    detail:
      'Mỗi sáng Người luyện tập thể dục, đọc báo, ghi chép chi tiết. Thói quen này giúp Bác duy trì trí tuệ minh mẫn suốt nhiều thập kỷ.',
    images: [
      {
        alt: 'Bác Hồ đọc sách và ghi chép trong phòng làm việc',
        src: BacHoghichep,
        sizeClass: 'h-100 sm:h-100',
        offsetClass: '',
      },
    ],
  },
  {
    title: 'Cần - Kiệm - Liêm - Chính',
    detail:
      'Bác nói “một đồng, một hạt gạo của nhân dân đều đáng quý”. Từ bữa ăn đến việc sử dụng thời gian, tất cả đều đo bằng lợi ích của dân.',
    images: [
      {
        alt: 'Bác Hồ làm việc bên bàn gỗ mộc mạc',
        src: BacHonoichuyenvoimoinguoi,
        sizeClass: 'h-100 sm:h-100',
        offsetClass: '',
      },
    ],
  },
]

export function Principles() {
  return (
    <section className="section-shell space-y-12">
      <SectionHeading
        eyebrow="Giá trị cốt lõi"
        title="Phong cách sống giản dị"
        description="Ba lớp ý nghĩa tạo nên phong thái Hồ Chí Minh: sống tối giản, tự rèn luyện và đặt trách nhiệm với nhân dân lên hàng đầu."
      />

      <div className="space-y-8">
        {principles.map((principle, index) => (
          <article
            key={principle.title}
            className={`flex flex-col gap-6 lg:items-center ${
              index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            }`}
          >
            <div
              className={`flex-1 space-y-4 ${
                index === 0
                  ? 'lg:-mt-10 lg:pl-10'
                  : index === 2
                    ? 'lg:pl-10'
                    : ''
              }`}
            >
              <h3 className="font-serif text-3xl text-pine">
                {principle.title}
              </h3>
              <p className="text-base leading-relaxed text-ink/75">
                {index === 0
                  ? principle.detail
                      .replace('chiếc quạt mo', '\nchiếc quạt mo')
                      .split('\n')
                      .map((line, lineIndex) => (
                        <span key={lineIndex} className="block">
                          {line}
                        </span>
                      ))
                  : principle.detail}
              </p>
            </div>

            <div className="flex-1">
              {principle.images.length > 1 ? (
                <div
                  className={`grid grid-cols-2 items-center gap-6 ${
                    index === 0 ? 'lg:pl-6' : ''
                  }`}
                >
                  {principle.images.map((image) => (
                    <figure key={image.src} className="overflow-visible">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className={`${image.sizeClass ?? 'h-44 sm:h-52'} ${image.offsetClass ?? ''} w-full object-contain drop-shadow-md`}
                        loading="lazy"
                      />
                    </figure>
                  ))}
                </div>
              ) : (
                <figure className="overflow-visible">
                  <img
                    src={principle.images[0].src}
                    alt={principle.images[0].alt}
                    className={`${principle.images[0].sizeClass ?? 'h-52 sm:h-64'} w-full object-contain drop-shadow-md`}
                    loading="lazy"
                  />
                </figure>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
