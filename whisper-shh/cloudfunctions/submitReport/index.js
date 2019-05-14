// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await db.collection('reports').add({
    data: {
      isIllegal: event.isIllegal,
      isViolence: event.isViolence,
      isAdv: event.isAdv,
      isPor: event.isPor,
      isPla: event.isPla,
      isAttack: event.isAttack,
      details: event.details
    } 
  })
}