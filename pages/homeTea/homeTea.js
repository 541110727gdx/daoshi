// pages/homeTea/homeTea.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected:true,
    selected1:false,
    film:[],
    mov:[],
    loadingHidden:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      loadingHidden: false
    })
    wx.request({
      method: 'Get',
      url: 'https://message.sharetimes.cn/api/seven/none',
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        openId: wx.getStorageSync('openId')
      },
      success: function (res) {
        console.log(res);
        that.setData({
          film: res.data,
          loadingHidden:true
        })
        // console.log(that.data.film)
      },
      error: function () {
        console.log("出错了")
      }
    })
  },
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true,
      loadingHidden: false
    })
    var that = this;
    wx.request({
      method: 'Get',
      url: 'https://message.sharetimes.cn/api/seven/none',
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // console.log(res);
        that.setData({
          film: res.data,
          loadingHidden: true
        })
        console.log(that.data.film)
      },
      error: function () {
        console.log("出错了")
      }
    })
  },
  selected1: function (e) {
    var that = this;
    this.setData({
      selected: false,
      selected1: true,
      loadingHidden: false
    })
    wx.request({
      method:'Get',
      url: 'https://message.sharetimes.cn/api/seven/evaluate',
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res) {
        console.log(res);
        that.setData({
          mov:res.data,
          loadingHidden: true
        })
        console.log(that.data.mov)
      }
    })
  },
  goDetail: function (e) {
    var filmid = e.currentTarget.dataset.uid;
    var videoid = e.currentTarget.dataset.vid;
    wx.navigateTo({
      url: "../detailTea/detailTea?uid=" + filmid + '&vid=' + videoid
    })
  },
  goYi:function(e) {
    var filmid = e.currentTarget.dataset.uid;
    var videoid = e.currentTarget.dataset.vid;
    wx.navigateTo({
      url: "../yiDian/yiDian?uid=" + filmid + '&vid=' + videoid
    })
  }
})