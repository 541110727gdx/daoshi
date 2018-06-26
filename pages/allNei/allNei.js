// pages/allNei/allNei.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nei:[],
    ifNei:false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    if(options.status != 1) {
      that.setData({
        ifNei:true
      })
    }
    wx.request({
      url: 'https://message.sharetimes.cn/api/square/myvideo',
      data:{
        open_id:wx.getStorageSync('openId'),
        status:options.status
      },
      method: 'POST',
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res) {
        if(res.data.code == 'ok') {
          that.setData({
            nei:res.data.data
          })
        }
        console.log(that.data.nei)
      }
    })
  },
  goDetail: function (e) {
    var filmid = e.currentTarget.dataset.uid;
    var videoid = e.currentTarget.dataset.vid;
    wx.navigateTo({
      url: "../detail/detail?uid=" + filmid + '&vid=' + videoid
    })
  }
  
})