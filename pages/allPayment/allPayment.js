// pages/allPayment/allPayment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ding1:true,
    ding2:false,
    ding3:false,
    quan:[],
    wei:[],
    yi:[],
    loadingHidden:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://message.sharetimes.cn/api/square/myorder',
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data:{
        open_id:wx.getStorageSync('openId')
      },
      success:function(res) {
        console.log(res)
        if(res.data.code == 'ok') {
          var wei =[];
          var yi = [];
          for(var i = 0;i<res.data.data.length;i++) {
            if (res.data.data[i].video_id == 0) {//未完成
              wei.push(res.data.data[i])
            } 
          }
          for (var j = 0; j < res.data.data.length; j++) {
            if (res.data.data[j].video_id !== 0) {//未完成
              yi.push(res.data.data[j])
            }
          }
          that.setData({
            yi:yi,
            wei:wei,
            quan:res.data.data,
            loadingHidden:true
          })
        } else {

        }
      }
    })
  },
  ding1:function() {
    this.setData({
      ding1: true,
      ding2: false,
      ding3: false
    })
  },
  ding2: function () {
    this.setData({
      ding1: false,
      ding2: true,
      ding3: false
    })
  },
  ding3: function () {
    this.setData({
      ding1: false,
      ding2: false,
      ding3: true
    })
  }
})