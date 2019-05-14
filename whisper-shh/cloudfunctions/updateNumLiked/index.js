const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  if(event.isLiked){
    try {
      return await db.collection('messages').doc(event.id).update({
        data: {
          numLiked: _.inc(1)
        },
      })
    } catch (e) {
      console.error(e)
    }
  }
  else if(!event.isLiked){
    if (db.collection('messages').where({
      numLiked: _.neq(0)
    })){
      try {
        return await db.collection('messages').doc(event.id).update({
          data: {
            numLiked: _.inc(-1)
          },
        })
      } catch (e) {
        console.error(e)
      }
    }
  }
}