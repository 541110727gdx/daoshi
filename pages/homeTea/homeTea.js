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
  onLoad: function (options) {//未点评
    var that = this;
    that.setData({
      loadingHidden: false
    })
    wx.request({
      method: 'POST',
      url: 'https://message.sharetimes.cn/api/seven/teacher',
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        type:2
      },
      success: function (res) {
        console.log(res);
        if(res.data.code == 'ok') {
          that.setData({
            film: res.data.data,
            loadingHidden: true
          })
        } else {

        }
        
      },
      error: function () {
        console.log("出错了")
      }
    })
  },
  selected: function (e) {//未点评
    this.setData({
      selected1: false,
      selected: true,
      loadingHidden: false
    })
    var that = this;
    wx.request({
      method: 'POST',
      url: 'https://message.sharetimes.cn/api/seven/teacher',
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        type:2
      },
      success: function (res) {
        if (res.data.code == 'ok') {
          that.setData({
            film: res.data.data,
            loadingHidden: true
          })
        } else {

        }
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
      method:'POST',
      url: 'https://message.sharetimes.cn/api/seven/teacher',
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        type:1
      },
      success:function(res) {
        console.log(res)
        if(res.data.code == 'ok') {
          that.setData({
            mov: res.data.data,
            loadingHidden: true
          })
        } else {

        }
        
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