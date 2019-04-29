// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await db.collection('messages').add({
    data:{
      message: event.message,
      openid: event.openid,
      nickName: event.nickName,
      imgUrl: event.imgUrl,
      date: event.date,
      tags: event.tags
    }
  })
}