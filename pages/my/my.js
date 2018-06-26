// pages/my/my.js
const sub = require("../../utils/sub.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: false,
    payments:[],
    video:[],
    evaluate:[],
    ifPing:false,
    ifNei:false,
    ifDing:false,
    qing:true
},
  goHome:function() {
    wx.redirectTo({
      url: '../home/home'
    })
  },
  goGuang: function () {
    if (wx.getStorageSync('loginKey')) {
      wx.navigateTo({
        url: '../guang/guang'
      })
    } else {
      wx.navigateTo({
        url: '../login/login'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://message.sharetimes.cn/api/square/myhome',
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: {
        open_id: wx.getStorageSync('openId')
      },
      success: function (res) {
        console.log(res)
        if(res.data.code == 'ok') {
          if (res.data.data.payments == '没有信息') {
            that.setData({
              ifDing: true
            })
          }
          if (res.data.data.video == '没有信息') {
            that.setData({
              ifNei: true
            })
          }
          if (res.data.data.evaluate == '没有信息') {
            that.setData({
              ifPing: true
            })
          }
          that.setData({
            payments: res.data.data.payments,
            video: res.data.data.video,
            evaluate: res.data.data.evaluate,
            loadingHidden:true
          })
        } else if(res.data.code == 'error'){
          that.setData({
            ifPing: true,
            ifNei: true,
            ifDing: true,
            qing:false,
            loadingHidden: true
          })
        } 
      }
    })
      
  },
  goBao:function() {
    wx.navigateTo({
      url: '../guize/guize'
    })
  },
  goAllDing:function(e) {
    wx.navigateTo({
      url: '../allPayment/allPayment'
    })
  },
  goWan:function(e) {
    wx.navigateTo({
      url: '../baoming/baoming?dingId=' + e.target.dataset.id+'&ifShi=1'
    })
  },
  goAllNei:function() {
    wx.navigateTo({
      url: '../allNei/allNei?open_id='+wx.getStorageSync('openId')+'&status=1'
    })
  },
  goAllPing:function() {
    wx.navigateTo({
      url: '../allNei/allNei?open_id=' + wx.getStorageSync('openId') + '&status=2'
    })
  },
  goDetail:function(e) {
    var filmid = e.currentTarget.dataset.uid;
    var videoid = e.currentTarget.dataset.vid;
    wx.navigateTo({
      url: "../detail/detail?uid=" + filmid + '&vid=' + videoid
    })
  }
})