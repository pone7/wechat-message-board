const db = wx.cloud.database()
const userInfo = db.collection('userInfo')
Page({

  /**
   * Page initial data
   */
  data: {
    user: {
      nickName: "Log in",
      avatarUrl: '../../images/account.png'
    },
    userInfo: [],
    openid: '',
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  getUserInfo: function (result) {
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        this.setData({
          openid: res.result.openid,
          user: result.detail.userInfo,
        })
      }
    })
    userInfo.get().then(res => {
      this.setData({
        userInfo: res.data
      })
    })
    var count = userInfo.where({
      _openid: this.openid
    }).count().then(res => {
      if (res.total == 0) {
        userInfo.add({
          data: result.detail.userInfo
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      } else {
      }
    })
  },
})