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
      numLiked: event.numLiked,
      isLove: event.isLove,
      isLife: event.isLife,
      isGame: event.isGame,
      isStudy: event.isStudy,
      isNo: event.isNo,
      tags: event.tags,
      comments: event.comments,
      isLike: event.isLike
    }
  })
}