// pages/guang/guang.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    guang:[],
    activity:[],
    status:1,
    date:'',
    keyword:'',
    re:true,
    shi:false,
    loadingHidden:false,
    num:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://message.sharetimes.cn/api/square/videosearch',
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data:{
        keyword:'',
        status:that.data.status,
        date:''
      },
      success:function(res) {
        console.log(res)
        if(res.data.code == 'ok') {
          that.setData({
            guang: res.data.data.video,
            activity: res.data.data.activity,
            loadingHidden:true
          })
        } else {

        }
        
      }
    })
  },
  join: function () {
    if (wx.getStorageSync('loginKey')) {
      wx.navigateTo({
        url: '../guize/guize'
      })
    } else {
      wx.navigateTo({
        url: '../login/login'
      })
    }
  },
  goMy: function () {
    if (wx.getStorageSync('loginKey')) {
      wx.redirectTo({
        url: '../my/my'
      })
    } else {
      wx.redirectTo({
        url: '../login/login'
      })
    }
  },
  goHome: function () {
    wx.redirectTo({
      url: '../home/home'
    })
  },
  seaClick1:function() {//热度
    var that = this;
    this.setData({
      re:true,
      shi:false,
      status:1,
      loadingHidden: false
    })
    wx.request({
      url: 'https://message.sharetimes.cn/api/square/videosearch',
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: {
        keyword: '',
        status: that.data.status,
        date: that.data.date
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 'ok') {
          that.setData({
            guang: res.data.data.video,
            activity: res.data.data.activity,
            loadingHidden: true
          })
        } else {

        }

      }
    })
  },
  seaClick2: function () {//时间
    var that = this;
    this.setData({
      re: false,
      shi: true,
      status: 2,
      loadingHidden: false
    })
    wx.request({
      url: 'https://message.sharetimes.cn/api/square/videosearch',
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: {
        keyword: '',
        status: that.data.status,
        date: that.data.date
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 'ok') {
          that.setData({
            guang: res.data.data.video,
            activity: res.data.data.activity,
            loadingHidden: true
          })
        } else {

        }

      }
    })
  },
  dateClick:function(e) {//期数
    var that = this;
    // console.log(e)
    this.setData({
      date: e.target.dataset.date,
      num:e.target.dataset.index,
      loadingHidden: false
    })
    wx.request({
      url: 'https://message.sharetimes.cn/api/square/videosearch',
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: {
        keyword: '',
        status: that.data.status,
        date: that.data.date
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 'ok') {
          that.setData({
            guang: res.data.data.video,
            activity: res.data.data.activity,
            loadingHidden: true
          })
        } else {

        }

      }
    })
  },
  search:function(e) {
    var that = this;
    that.setData({
      keyword:e.detail.value,
      loadingHidden: false
    })
    wx.request({
      url: 'https://message.sharetimes.cn/api/square/videosearch',
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: {
        keyword: that.data.keyword,
        status: that.data.status,
        date: that.data.date
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 'ok') {
          that.setData({
            guang: res.data.data.video,
            activity: res.data.data.activity,
            loadingHidden: true
          })
        } else if(res.data.code == 'null'){
          that.setData({
            loadingHidden: true
          })
          wx.showToast({
            title: '没有相关信息',
            image: '../../img/error.png',
            duration: 2000
          })
        }

      }
    })
  },
  goDetail: function (e) {
    var filmid = e.currentTarget.dataset.uid;
    var videoid = e.currentTarget.dataset.vid;
    wx.navigateTo({
      url: "../detail/detail?uid=" + filmid + '&vid=' + videoid
    })
  },
})