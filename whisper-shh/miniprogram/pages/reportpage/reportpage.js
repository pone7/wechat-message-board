Page({
data:{
  isIllegal:false,
  isViolence:false,
  isAdv:false,
  isPor:false,
  isPla: false,
  isAttack: false,
  content: ''
},



selectIllegal(e){
  this.setData({
    isIllegal:!this.data.isIllegal,
    isViolence:false,
    isPor: false,
    isAdv:false,
    isPla: false,
    isAttack: false,
  })
},

selectViolence(e){
    this.setData({
      isViolence:!this.data.isViolence,
      isIllegal:false,
      isAdv:false,
      isPor: false,
      isPla: false,
      isAttack: false,
    })
},

selectAdv(e){
  this.setData({

    isAdv: !this.data.isAdv,
    isIllegal: false,
    isViolence:false,
    isPor:false,
    isPla: false,
    isAttack: false,
  })
  
},

selectPor(e){
  this.setData({

    isPor:!this.data.isPor,
    isIllegal: false,
    isViolence: false,
    isAdv:false,
    isPla:false,
    isAttack: false,
  })
},

selectPla(e){
  this.setData({
    isPla:!this.data.isPla,
    isPor: false,
    isIllegal: false,
    isViolence: false,
    isAdv: false,
    isAttack:false,
  })
},
  selectAttack(e) {
    this.setData({
      isAttack: !this.data.isAttack,
      isPor: false,
      isIllegal: false,
      isViolence: false,
      isAdv: false,
      isPla:false,
    })
  },

  getContent: function(e){
    this.setData({
      content: e.detail.value
    })
  },

  submit: function () {
    wx.cloud.callFunction({
      name: 'submitReport',
      data: {
        isIllegal: this.data.isIllegal,
        isViolence: this.data.isViolence,
        isAdv: this.data.isAdv,
        isPor: this.data.isPor,
        isPla: this.data.isPor,
        isAttack: this.data.isAttack,
        content: this.data.content
      },
      success: res => {
      },
      fail: err => {
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
  }
})