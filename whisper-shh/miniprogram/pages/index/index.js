const db = wx.cloud.database()
const messages = db.collection('messages')
var mydata = new Array
var found = new Array
var likedList = new Array

Page({
  data:{
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    isFold: true,
    loveTap: false,
    lifeTap: false,
    gameTap: false,
    studyTap: false,
    dataset: [],
    dataset2: [],
    dataset3: [],
    searchContent: '',
    searchRes: [],
    comment: ''
  },

  onLoad: function () {
    var that = this;
    
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        })
      }
    })


    messages.orderBy('date', 'desc').where({}).get({
      success: res=>{
        mydata = res.data
        for(var i = 0; i < mydata.length; i++){
          var timeSpace = this.getTime(Date.parse(mydata[i].date))
          mydata[i].date = timeSpace
          if (likedList.length > 0) {
            var id = mydata[i]._id
            for (var j = 0; j < likedList.length; j++) {
              if (id == likedList[j]) {
                console.log('like is on')
                mydata[i].isLike = true
              }
            }
          }else{
            mydata[i].isLike = false
          }
        }
        this.setData({
          dataset: mydata,
        })
      }
    })

    messages.orderBy('numLiked', 'desc').where({}).get({
      success: res => {
        mydata = res.data
        for (var i = 0; i < mydata.length; i++) {
          var timeSpace = this.getTime(Date.parse(mydata[i].date))
          mydata[i].date = timeSpace
          if (likedList.length > 0) {
            var id = mydata[i]._id
            console.log(likedList)
            for (var j = 0; j < likedList.length; j++) {
              if (id == likedList[j]) {
                console.log('like is on')
                mydata[i].isLike = true
              }
            }
          } else {
            mydata[i].isLike = false
          }
        }
        this.setData({
          dataset2: mydata,
        })
      }
    })
    if (this.data.gameTap) { this.sortGame()}
    else if(this.data.lifeTap){ this.sortLife()}
    else if(this.data.loveTap){ this.sortLove()}
    else if(this.data.studyTap){ this.sortStudy()}
  },

  onPullDownRefresh: function () {
    messages.orderBy('date', 'desc').where({}).get({
      success: res => {
        mydata = res.data
        for (var i = 0; i < mydata.length; i++) {
          var timeSpace = this.getTime(Date.parse(mydata[i].date))
          mydata[i].date = timeSpace
          if (likedList.length > 0) {
            var id = mydata[i]._id
            console.log(likedList)
            for (var j = 0; j < likedList.length; j++) {
              if (id == likedList[j]) {
                mydata[i].isLike = true
              }
            }
          } else {
            mydata[i].isLike = false
          }
        }
        this.setData({
          dataset: mydata,
        })
      }
    })

    messages.orderBy('numLiked', 'desc').where({}).get({
      success: res => {
        mydata = res.data
        for (var i = 0; i < mydata.length; i++) {
          var timeSpace = this.getTime(Date.parse(mydata[i].date))
          mydata[i].date = timeSpace
          if (likedList.length > 0) {
            var id = mydata[i]._id
            for (var j = 0; j < likedList.length; j++) {
              if (id == likedList[j]) {
                console.log('like is on')
                mydata[i].isLike = true
              }
            }
          } else {
            mydata[i].isLike = false
          }
        }
        this.setData({
          dataset2: mydata,
        })
      }
    })

    if (this.data.gameTap) { this.sortGame() }
    else if (this.data.lifeTap) { this.sortLife() }
    else if (this.data.loveTap) { this.sortLove() }
    else if (this.data.studyTap) { this.sortStudy() }

    wx.stopPullDownRefresh()
  },

  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },

  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } 
    else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  tapLike(e){
    this.setData({
      isLiked: !this.data.isLiked,
    })
    var like = false
    if (likedList.length < 1 && this.data.isLiked){
      likedList.push(e.target.id)
      like = true
    }else{
      if (likedList.indexOf(e.target.id) >= 0) {
        var val = e.target.id;
        for (var i = 0; i < likedList.length;i++){
          if(val == likedList[i]){
            likedList.splice(i,1)
          }
        }
        like = false
      } else {
        likedList.push(e.target.id)
        like = true
      }
    }
    console.log(likedList)

    wx.cloud.callFunction({
      name: 'updateNumLiked',
      data:{
        isLiked: like,
        id: e.target.id,
      },
      success: function(res){
        console.log(res)
      },
      fail: console.error
    })
    this.setData({
      isLiked: !this.data.isLiked,
    })
    this.onLoad()
  },

  showComment(e){
    this.setData({
      isFold: !this.data.isFold,
    })
  },

  getTime: function (date1) {
    var date2 = new Date();
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var time = timestamp - date1 / 1000;
    var day = Math.floor(time / 86400);
    var hour = Math.floor(time % 86400 / 3600);
    var minute = Math.floor(time % 86400 % 3600 / 60);
    //console.log(day, hour, minute)
    var output = '';
    if (day != 0) {
      output = day + ' day ago';
    } else if (day == 0 && hour != 0) {
      output = hour + ' hour ago';
    } else if (day == 0 && hour == 0 && minute != 0) {
      output = minute + ' minutes ago';
    }
    return output
  },

  sortLove: function(e){
    this.setData({
      loveTap: true,
      lifeTap: false,
      gameTap: false,
      studyTap: false,
    })
        messages.orderBy('date', 'desc').where({
      isLove: true,
    }).get({
      success: res => {
        mydata = res.data
        for (var i = 0; i < mydata.length; i++) {
          var timeSpace = this.getTime(Date.parse(mydata[i].date))
          mydata[i].date = timeSpace
          if (likedList.length > 0) {
            var id = mydata[i]._id
            console.log(likedList)
            for (var j = 0; j < likedList.length; j++) {
              if (id == likedList[j]) {
                console.log('like is on')
                mydata[i].isLike = true
              }
            }
          } else {
            mydata[i].isLike = false
          }
        }
        this.setData({
          dataset3: mydata,
        })
      }
    })
  },

  sortLife: function (e) {
    this.setData({
      loveTap: false,
      lifeTap: true,
      gameTap: false,
      studyTap: false,
    })
    messages.orderBy('date', 'desc').where({
      isLife: true,
    }).get({
      success: res => {
        mydata = res.data
        for (var i = 0; i < mydata.length; i++) {
          var timeSpace = this.getTime(Date.parse(mydata[i].date))
          mydata[i].date = timeSpace
          if (likedList.length > 0) {
            var id = mydata[i]._id
            console.log(likedList)
            for (var j = 0; j < likedList.length; j++) {
              if (id == likedList[j]) {
                console.log('like is on')
                mydata[i].isLike = true
              }
            }
          } else {
            mydata[i].isLike = false
          }
        }
        this.setData({
          dataset3: mydata,
        })
      }
    })
  },

  sortGame: function (e) {
    this.setData({
      loveTap: false,
      lifeTap: false,
      gameTap: true,
      studyTap: false,
    })
    messages.orderBy('date', 'desc').where({
      isGame: true,
    }).get({
      success: res => {
        mydata = res.data
        for (var i = 0; i < mydata.length; i++) {
          var timeSpace = this.getTime(Date.parse(mydata[i].date))
          mydata[i].date = timeSpace
          if (likedList.length > 0) {
            var id = mydata[i]._id
            console.log(likedList)
            for (var j = 0; j < likedList.length; j++) {
              if (id == likedList[j]) {
                console.log('like is on')
                mydata[i].isLike = true
              }
            }
          } else {
            mydata[i].isLike = false
          }
        }
        this.setData({
          dataset3: mydata,
        })
      }
    })
  },

  sortStudy: function (e) {
    this.setData({
      loveTap: false,
      lifeTap: false,
      gameTap: false,
      studyTap: true,
    })
    messages.orderBy('date', 'desc').where({
      isStudy: true,
    }).get({
      success: res => {
        mydata = res.data
        for (var i = 0; i < mydata.length; i++) {
          var timeSpace = this.getTime(Date.parse(mydata[i].date))
          mydata[i].date = timeSpace
          if (likedList.length > 0) {
            var id = mydata[i]._id
            console.log(likedList)
            for (var j = 0; j < likedList.length; j++) {
              if (id == likedList[j]) {
                console.log('like is on')
                mydata[i].isLike = true
              }
            }
          } else {
            mydata[i].isLike = false
          }
        }
        this.setData({
          dataset3: mydata,
        })
      }
    })
  },

  goReportPage: function (e)
  {
    wx.navigateTo({
      url: '/pages/reportpage/reportpage',
    })
  },

  getContent: function(e)
  {
    this.setData({
      searchContent: e.detail.value
    })
  },

  search: function(e)
  {
    console.log(this.data.searchContent)
    for(let i=0; i < mydata.length; i++){
      if(mydata[i].message.indexOf(this.data.searchContent)>= 0){
        found.push(mydata[i])
      }
    }
    this.setData({
      searchRes: found
    })
    found = []
    console.log(this.data.searchRes)

    wx.setStorage({
      key: 'searchMessages',
      data: this.data.searchRes,
    })

    wx.setStorage({
      key: 'searchText',
      data: this.data.searchContent,
    })

    var that = this
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  getComment: function (e) {
    this.setData({
      comment: e.detail.value
    })
  },

  sendComment: function (e) {
    var cheatComment = '\n' + this.data.comment
    wx.cloud.callFunction({
      name: 'addComment',
      data: {
        comment: cheatComment,
        id: e.target.id,
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
      },
      fail: console.error
    })
    console.log('ok')
    this.onLoad()
  }
})