const db = wx.cloud.database()
const messages = db.collection('messages')

// pages/myPosts/myPosts.js
Page({

  /**
   * Page initial data
   */
  data: {
    dataset: [],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options){
    messages.orderBy('date','desc').where({openid: options.id}).get({
      success: res=> {
        console.log(res)
        this.setData({
          dataset: res.data
        })
        let mydata = this.data.dataset
        for (var i = 0; i < mydata.length; i++) {
          var timeSpace = this.getTime(Date.parse(mydata[i].date))
          mydata[i].date = timeSpace
        }
        this.setData({
          dataset: mydata
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
  
  showComment(e) {
    this.setData({
      isFold: !this.data.isFold,
    })
  },
})