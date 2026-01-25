const heroImage =
  'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/473846zFS/su-gian-di-cua-bac-ho-387158.jpg'

const heroStats = [
  { labelLine1: 'Giờ thức', labelLine2: 'dậy', value: '04:30' },
  { labelLine1: 'Thời gian', labelLine2: 'đọc - viết', value: '5h/ngày' },
  { labelLine1: 'Phong cách', labelLine2: 'ăn uống', value: 'Đạm bạc' },
]

export function Hero() {
  return (
    <section
      id="home"
      className="section-shell relative flex min-h-[calc(100vh-10rem)] items-center overflow-hidden scroll-mt-24"
    >
      <div className="absolute inset-0 -z-10 bg-fiber-paper opacity-60" />
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="space-y-6 lg:w-1/2">
          <p className="eyebrow">Nếp sống giản dị</p>
          <h1 className="font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Một ngày dung dị của{' '}
            <span className="text-lotus">Chủ tịch Hồ Chí Minh</span>
          </h1>
          <p className="text-lg leading-relaxed text-ink/80">
            Bên cạnh trọng trách quốc gia, Bác Hồ giữ cho mình một nếp sống
            gọn gàng, tiết kiệm và ngập tràn yêu thương. Trang web nhỏ này mô
            phỏng nhịp sinh hoạt thường nhật của Người để chúng ta có thể học
            tập tinh thần giản dị mà sâu sắc ấy.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div
                key={`${stat.labelLine1}-${stat.labelLine2}`}
                className="group flex min-h-[132px] flex-col items-center justify-center rounded-2xl border border-bamboo/60 bg-gradient-to-br from-white via-white to-parchment/60 p-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-lotus/50 hover:shadow-lg hover:shadow-lotus/15"
              >
                <div className="flex min-h-[44px] items-center justify-center">
                  <p className="text-3xl font-semibold leading-none tracking-tight text-pine sm:text-[1.8rem]">
                    {stat.value}
                  </p>
                </div>
                <div className="my-3 h-px w-10 bg-bamboo/60 transition group-hover:w-14 group-hover:bg-lotus/60" />
                <p className="text-[0.68rem] uppercase tracking-[0.38em] text-ink/60">
                  <span className="block">{stat.labelLine1}</span>
                  <span className="block">{stat.labelLine2}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="relative">
            <figure className="overflow-hidden rounded-[2.75rem] border border-bamboo/40 bg-white/80 shadow-parchment">
              <img
                src={heroImage}
                alt="Chủ tịch Hồ Chí Minh với nụ cười hiền hòa"
                className="h-[26rem] w-full object-cover sm:h-[30rem] lg:h-[34rem]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pine/70 via-transparent to-transparent" />
            </figure>
            <div className="absolute -bottom-8 right-4 rounded-2xl border border-lotus/40 bg-white/95 p-4 shadow-lg">
              <p className="text-sm text-ink/70">
                “Sinh hoạt giản dị giúp giữ tâm trí trong sáng, dành trọn thời
                gian cho nhân dân.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
