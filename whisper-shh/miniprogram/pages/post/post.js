// pages/post/post.js
const db = wx.cloud.database()
const userInfo = db.collection('userInfo')
// var tags = new Array

Page({

  /**
   * Page initial data
   */
  data: {
    date: '',
    openid: '',
    message: '',
    nickName: '',
    imgUrl: '/images/picture-white.png',
    numLiked: 0,
    isLove: false,
    isLife: false,
    isGame: false,
    isStudy: false,
    isNo: true,
    tags: '',
    comments: [],
    isLike: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        this.setData({
          openid: res.result.openid
        })
      }
    })
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

  handleMessage: function (event) {
    this.setData({
      message: event.detail.value
    })
  },

  handleNickName: function (event) {
    this.setData({
      nickName: event.detail.value
    })
  },

  selectLove(e) {
    this.setData({
      isLove: !this.data.isLove,
      isLife: false,
      isGame: false,
      isStudy: false,
      isNo: false,
    })
  },
  selectLife(e) {
    this.setData({
      isLife: !this.data.isLife,
      isLove: false,
      isGame: false,
      isStudy: false,
      isNo: false,
    })
  },
  selectGame(e) {
    this.setData({
      isGame: !this.data.isGame,
      isLife: false,
      isLove: false,
      isStudy: false,
      isNo: false,
    })
  },
  selectStudy(e) {
    this.setData({
      isStudy: !this.data.isStudy,
      isLife: false,
      isGame: false,
      isLove: false,
      isNo: false,
    })
  },
  selectNo(e) {
    this.setData({
      isNo: !this.data.isNo,
      isLife: false,
      isGame: false,
      isStudy: false,
      isLove: false,
    })
  },

  uploadPic: function (event) {
    wx.chooseImage({
      success: res => {
        const tempFilePath = res.tempFilePaths[0]
        this.setData({
          imgUrl: tempFilePath
        })
      },
    })
  },

  setTag: function(){
    console.log('OK')
    if (this.data.isLove) {
      var tag = '#Love'
      this.setData({
        tags: tag
      })
    }
    else if (this.data.isGame) {
      var tag = '#Game'
      this.setData({
        tags: tag
      })
    }
    else if (this.data.isStudy) {
      var tag = '#Study'
      this.setData({
        tags: tag
      })
    }
    else if (this.data.isLife) {
      var tag = '#Life'
      this.setData({
        tags: tag
      })
    }
    else{
      this.setData({
        tags: ''
      })
    }

  },

  leaveMessage: function (event) {
    this.setTag()
    console.log(this.data.tags)
    if (this.data.message && this.data.nickName) {
      wx.showLoading({
        title: 'sending',
      })
      wx.cloud.uploadFile({
        cloudPath: this.data.openid + Math.floor(Math.random() * 10000000) + '.jdg',
        filePath: this.data.imgUrl,
        success: res => {
          wx.cloud.callFunction({
            name: 'leaveMessage',
            data: {
              openid: this.data.openid,
              message: this.data.message,
              nickName: this.data.nickName,
              imgUrl: res.fileID,
              date: new Date().toJSON(),
              numLiked: 0,
              isGame: this.data.isGame,
              isLife: this.data.isLife,
              isLove: this.data.isLove,
              isStudy: this.data.isStudy,
              isNo: this.data.isNo,
              tags: this.data.tags,
              comments: this.data.comments,
              isLike: this.data.isLike
            },
            complete: res => {
              console.log(res)
              wx.hideLoading()
              wx.showToast({
                title: 'success',
                icon: 'success',
                duration: 2000
              })
              wx.switchTab({
                url: '../index/index',
              })
            }
          })
        },
        fail: console.error
      })
    } else {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
      })
    }
  }
})