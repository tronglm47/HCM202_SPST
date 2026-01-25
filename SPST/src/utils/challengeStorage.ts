// Utility để quản lý localStorage cho challenge

export interface ChallengeProgress {
    planId: number
    userId: string
    startDate: string // ISO date string
    completedDays: number[]
    currentStatus: 'not-started' | 'in-progress' | 'completed'
}

const STORAGE_KEY = 'challenge_progress'
const USER_ID_KEY = 'challenge_user_id'

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
    const today = new Date().toISOString().split('T')[0]

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
    const today = new Date()
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
    const today = new Date()
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
