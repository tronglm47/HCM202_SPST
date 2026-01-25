import { useEffect, useState } from 'react'
import { SectionHeading } from '../components/SectionHeading'

interface RankingEntry {
    id: string
    rank: number
    name: string
    point: number
    time: number
    completedTime?: string
}

export function RankingPage() {
    const [ranking, setRanking] = useState<RankingEntry[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                setLoading(true)
                const response = await fetch('https://6727111d302d03037e6f3df4.mockapi.io/api/v1/ranking')
                if (!response.ok) throw new Error('Failed to fetch ranking')

                const data = await response.json()
                // Sort by point descending to ensure correct ranking
                const sortedData = data.sort((a: any, b: any) => b.point - a.point)
                const processedData = sortedData.map((item: any, index: number) => {
                    // Convert time (seconds) to MM:SS format
                    const minutes = Math.floor(item.time / 60)
                    const seconds = item.time % 60
                    const completedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`

                    return {
                        ...item,
                        rank: index + 1,
                        completedTime,
                    }
                })
                setRanking(processedData)
                setError(null)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Lỗi tải dữ liệu')
                setRanking([])
            } finally {
                setLoading(false)
            }
        }

        fetchRanking()
    }, [])

    const getMedalIcon = (rank: number) => {
        if (rank === 1) return '🥇'
        if (rank === 2) return '🥈'
        if (rank === 3) return '🥉'
        return rank
    }

    const getRowStyles = (rank: number) => {
        if (rank === 1) return 'bg-linear-to-r from-bamboo/10 to-bamboo/5'
        if (rank === 2) return 'bg-linear-to-r from-bamboo/10 to-bamboo/5'
        if (rank === 3) return 'bg-linear-to-r from-bamboo/10 to-bamboo/5'
        return 'hover:bg-pine/5'
    }

    const getRankBadgeColor = (rank: number) => {
        if (rank === 1) return 'text-bamboo font-bold'
        if (rank === 2) return 'text-parchment font-semibold'
        if (rank === 3) return 'text-lotus font-semibold'
        return 'text-ink/40 font-medium'
    }

    // Pagination logic
    const totalPages = Math.ceil(ranking.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedRanking = ranking.slice(startIndex, endIndex)

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1))
    }

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    }

    return (
        <main className="min-h-screen bg-linear-to-b from-parchment via-parchment/50 to-white">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <SectionHeading
                    eyebrow="Thành tựu cộng đồng"
                    title="Bảng Xếp Hạng Gương Sáng"
                    description="Những người dẫn đầu trong hành trình sống theo tinh thần Hồ Chí Minh"
                />

                {loading && (
                    <div className="mt-16 text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pine mx-auto mb-4"></div>
                        <p className="text-ink/60">Đang tải dữ liệu...</p>
                    </div>
                )}

                {error && (
                    <div className="mt-16 bg-lotus/10 border border-lotus text-lotus rounded-2xl p-6 text-center">
                        <p className="font-medium">⚠️ {error}</p>
                    </div>
                )}
                {!loading && !error && ranking.length > 0 && (
                    <div className="mt-12 bg-white rounded-3xl shadow-2xl overflow-hidden border border-bamboo/10">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-linear-to-r from-pine to-pine/80 text-white">
                                        <th className="px-6 py-4 text-left font-semibold">Hạng</th>
                                        <th className="px-6 py-4 text-left font-semibold">Tên</th>
                                        <th className="px-6 py-4 text-center font-semibold">Tổng lượt</th>
                                        <th className="px-6 py-4 text-right font-semibold pr-6">Thời gian hoàn thành</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedRanking.map((entry) => (
                                        <tr
                                            key={entry.id}
                                            className={`border-b border-pine/5 transition ${getRowStyles(entry.rank)}`}
                                        >
                                            <td className={`px-6 py-5 text-lg ${getRankBadgeColor(entry.rank)}`}>
                                                {getMedalIcon(entry.rank)}
                                            </td>
                                            <td className="px-6 py-5">
                                                <p className="font-semibold text-pine">{entry.name}</p>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className="inline-block bg-bamboo/10 text-bamboo font-bold px-4 py-2 rounded-full text-sm">
                                                    {entry.point.toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-right text-ink/60 italic pr-6">{entry.completedTime}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Decorative gradient bar */}
                        <div className="h-1 w-full flex">
                            <div className="h-full flex-1 bg-bamboo/20"></div>
                            <div className="h-full flex-1 bg-bamboo/40"></div>
                            <div className="h-full flex-1 bg-bamboo/60"></div>
                            <div className="h-full flex-1 bg-bamboo/80"></div>
                            <div className="h-full flex-1 bg-bamboo"></div>
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-4 px-6 py-6">
                                <button
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 rounded-lg border border-bamboo/30 text-pine font-medium hover:bg-bamboo/10 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    ← Trước
                                </button>

                                <div className="flex items-center gap-2">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`w-10 h-10 rounded-lg font-semibold transition ${currentPage === page
                                                ? 'bg-bamboo text-white'
                                                : 'border border-bamboo/30 text-pine hover:bg-bamboo/10'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 rounded-lg border border-bamboo/30 text-pine font-medium hover:bg-bamboo/10 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    Sau →
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {!loading && !error && ranking.length === 0 && (
                    <div className="mt-16 text-center py-12">
                        <p className="text-ink/60">Chưa có dữ liệu xếp hạng</p>
                    </div>
                )}

                <div className="mt-12 text-center">
                    <p className="text-sm text-ink/50 italic">
                        "Thứ hạng chỉ là con số, giá trị thực nằm ở những gì ta học được."
                    </p>
                </div>
            </div>
        </main>
    )
}
