// Utility để quản lý localStorage cho challenge

import plans from '../plan.json'

export interface ChallengeProgress {
    planId: number
    userId: string
    startDate: string // ISO date string
    completedDays: number[]
    currentStatus: 'not-started' | 'in-progress' | 'completed'
}

const STORAGE_KEY = 'challenge_progress'
const USER_ID_KEY = 'challenge_user_id'

// Lấy hôm nay theo giờ Việt Nam (GMT+7)
const getTodayVN = (): string => {
    const now = new Date()
    const vnTime = new Date(now.getTime() + 7 * 60 * 60 * 1000)
    return vnTime.toISOString().split('T')[0]
}

// Tạo hoặc lấy user ID duy nhất
export const getUserId = (): string => {
    let userId = localStorage.getItem(USER_ID_KEY)
    if (!userId) {
        userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        localStorage.setItem(USER_ID_KEY, userId)
    }
    return userId
}

// Lấy progress hiện tại
export const getChallengeProgress = (planId: number): ChallengeProgress | null => {
    const userId = getUserId()
    const data = localStorage.getItem(`${STORAGE_KEY}_${planId}_${userId}`)
    return data ? JSON.parse(data) : null
}

// Lưu progress
export const saveChallengeProgress = (planId: number, progress: ChallengeProgress): void => {
    const userId = getUserId()
    localStorage.setItem(`${STORAGE_KEY}_${planId}_${userId}`, JSON.stringify(progress))
}

// Khởi tạo challenge
export const initializeChallenge = (planId: number): ChallengeProgress => {
    const userId = getUserId()
    const today = getTodayVN()

    const progress: ChallengeProgress = {
        planId,
        userId,
        startDate: today,
        completedDays: [],
        currentStatus: 'in-progress'
    }

    saveChallengeProgress(planId, progress)
    return progress
}

// Đánh dấu ngày hoàn thành
export const completeDay = (planId: number, dayIndex: number): ChallengeProgress => {
    let progress = getChallengeProgress(planId)

    if (!progress) {
        progress = initializeChallenge(planId)
    }

    if (!progress.completedDays.includes(dayIndex)) {
        progress.completedDays.push(dayIndex)
    }

    if (progress.completedDays.length === 7) {
        progress.currentStatus = 'completed'
    }

    saveChallengeProgress(planId, progress)
    return progress
}

// Kiểm tra xem ngày có được mở khóa không
export const isDayUnlocked = (planId: number, dayIndex: number): boolean => {
    const progress = getChallengeProgress(planId)

    if (!progress) {
        return false
    }

    // Ngày 0 luôn được mở khóa khi đã bắt đầu
    if (dayIndex === 0) {
        return true
    }

    // Kiểm tra xem đã bắt đầu chưa
    if (progress.currentStatus === 'not-started') {
        return false
    }

    const startDate = new Date(progress.startDate)
    const today = new Date(getTodayVN())
    const daysPassed = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

    // Mở khóa dựa trên số ngày đã qua
    // Ngày 1 = 0 ngày sau startDate, Ngày 2 = 1 ngày sau, v.v.
    return dayIndex <= daysPassed
}

// Lấy số ngày đã qua kể từ khi bắt đầu
export const getDaysPassed = (planId: number): number => {
    const progress = getChallengeProgress(planId)

    if (!progress || progress.currentStatus === 'not-started') {
        return 0
    }

    const startDate = new Date(progress.startDate)
    const today = new Date(getTodayVN())
    return Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
}

// Kiểm tra xem ngày đã hoàn thành chưa
export const isDayCompleted = (planId: number, dayIndex: number): boolean => {
    const progress = getChallengeProgress(planId)
    return progress ? progress.completedDays.includes(dayIndex) : false
}

// Reset challenge
export const resetChallenge = (planId: number): void => {
    const userId = getUserId()
    localStorage.removeItem(`${STORAGE_KEY}_${planId}_${userId}`)
}

// [DEV] Advance challenge start date (để test unlock ngày mới)
// Cách dùng: advanceChallengeDate(1, 3) → advance 3 ngày
// hoặc advanceCurrentChallenge(3) → auto-detect planId
export const advanceChallengeDate = (planId: number, daysToAdvance: number): void => {
    const progress = getChallengeProgress(planId)
    if (!progress) {
        console.warn('Không có challenge để advance')
        return
    }

    const currentStartDate = new Date(progress.startDate)
    const newStartDate = new Date(currentStartDate.getTime() - daysToAdvance * 24 * 60 * 60 * 1000)

    const updatedProgress: ChallengeProgress = {
        ...progress,
        startDate: newStartDate.toISOString().split('T')[0]
    }

    saveChallengeProgress(planId, updatedProgress)
    console.log(`✓ Advance challenge ${daysToAdvance} ngày. Start date mới: ${updatedProgress.startDate}`)
}

// [DEV] Lấy planId hiện tại của user (plan đầu tiên có progress)
export const getCurrentPlanId = (): number | null => {
    for (const plan of plans.weeks) {
        const progress = getChallengeProgress(plan.id)
        if (progress) {
            return plan.id
        }
    }
    return null
}

// [DEV] Advance challenge hiện tại mà không cần truyền planId
export const advanceCurrentChallenge = (daysToAdvance: number): void => {
    const planId = getCurrentPlanId()
    if (!planId) {
        console.warn('❌ Không có challenge nào. Hãy bắt đầu challenge trước!')
        return
    }
    advanceChallengeDate(planId, daysToAdvance)
}

// Expose to window for dev testing
if (typeof window !== 'undefined') {
    (window as any).__challengeStorage = {
        advanceChallengeDate,
        advanceCurrentChallenge,
        getCurrentPlanId,
        getChallengeProgress,
        resetChallenge,
        getUserId,
        // Debug helpers
        listAllChallenges: () => {
            const userId = getUserId()
            console.log('Current User ID:', userId)
            console.log('=== All Challenges in LocalStorage ===')
            const keys = Object.keys(localStorage).filter(k => k.includes('challenge_progress'))
            keys.forEach(key => {
                const data = localStorage.getItem(key)
                console.log(`Key: ${key}`)
                console.log(`Data:`, JSON.parse(data || '{}'))
            })
            return keys.length > 0 ? 'Tìm thấy' : 'Không có challenge nào'
        },
        clearAllChallenges: () => {
            const keys = Object.keys(localStorage).filter(k => k.includes('challenge_progress'))
            keys.forEach(key => localStorage.removeItem(key))
            console.log(`✓ Xóa ${keys.length} challenge(s)`)
        }
    }
}
