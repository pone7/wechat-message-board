// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('messages').doc(event.id).update({
    data: {
      comments: _.unshift(event.comment)
    },
    success(res) {
      console.log(res.data)
    }
    })
  } catch (e) {
    console.error(e)
  }




  // try {
  //   return await db.collection('messages').doc(event.id).update({
  //     data: {
  //       comments: comments.push(event.comment)
  //     },
  //   })
  // } catch (e) {
  //   console.error(e)
  // }
}