import type { Timestamp } from 'firebase-admin/firestore'
// 把firebaseTime 轉換成 正常時間
export function changeTime(ts: Timestamp):string{
    return ts.toDate().toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false  // 24小時制
    })
}