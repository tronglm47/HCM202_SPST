import { SectionHeading } from './SectionHeading'

export function ChallengeOverview({ onStart }: { onStart: () => void }) {
    return (
        <section className="section-shell space-y-12 scroll-mt-24 bg-white/90">
            <SectionHeading
                eyebrow="Thử thách 1 tuần"
                title="Sống tiết kiệm theo gợi ý của Bác"
                description="Mỗi ngày là một hành động nhỏ giúp nuôi dưỡng lối sống giản dị. Hoàn thành đủ 7 ngày, bạn sẽ có một câu chuyện thực tế để chia sẻ trên lớp."
            />

            <div className="flex flex-col items-center gap-8">
                <button
                    onClick={onStart}
                    className="px-8 py-3 bg-lotus/80 hover:bg-lotus text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                    Bắt đầu
                </button>
                <p className="text-xs text-bamboo/60 uppercase tracking-[0.3em]">
                    7 ngày ~ 7 thói quen ~ 1 tấm hồn đẹp
                </p>
            </div>

            <div className="rounded-4xl border border-pine/20 bg-pine/95 px-6 py-8 text-white shadow-xl shadow-pine/30">
                <h4 className="font-serif text-2xl">Nhật ký phản tư</h4>
                <p className="mt-2 text-sm text-bamboo">
                    Mỗi tối viết ba dòng: hôm nay bạn tiết kiệm được gì, học được điều gì,
                    và bạn muốn gửi lời tri ân đến ai. Đây chính là "bài tập về nhà" của
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
