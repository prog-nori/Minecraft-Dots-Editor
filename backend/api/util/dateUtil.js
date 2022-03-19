/**
 * 日付に関するユーティリティ
 */
const dateUtil = {
    /**
     * 今日を取得する
     * @returns yyyy-mm-dd
     */
    today: () => {
        const dt = new Date()
        const year = dt.getFullYear()
        const month = ('00' + (dt.getMonth() + 1)).slice(-2)
        const date = ('00' + dt.getDate()).slice(-2)
        const hour = dt.getHours()
        const min = dt.getMinutes()
        const sec = dt.getSeconds()
        return `${year}-${month}-${date}-${hour}-${min}-${sec}`
    }
}

module.exports = dateUtil