// pages/my/my.js
const sub = require("../../utils/sub.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weiHidden:true,
    comeHidden:true,
    loadingHidden:true,
    qi:'',
    video:[],
    array: ["北京", "上海", "天津", "重庆", "河北", "山西", "内蒙", "辽宁", "吉林", "黑龙江", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "广东", "广西", "海南", "四川", "贵州", "云南", "西藏", "陕西", "甘肃", "宁夏", "青海", "新疆", "香港", "澳门", "台湾", "其它"],
    xintai: ["娱乐大众", "专业院校学生", "职业规划发展"],
    lixiang: ["娱乐自嗨", "专业进修，将来成为专业歌手", "登上更大的舞台，成为艺人"],
    sexArr:["","男","女"],
    film:[],
    teaFilm:'',
    standard:''
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
    console.log(wx.getStorageSync('openId'))
    that.setData({
      loadingHidden: false
    })
      wx.request({
        url: 'https://message.sharetimes.cn/api/seven/myvideo',
        method: 'POST',
        data: {
          openId: wx.getStorageSync('openId')
        },
        header: {//请求头
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          that.setData({
            loadingHidden: true
          })
          if(res.data[2].length !== 0) {
            that.setData({
              weiHidden:false
            })
          } else {

          }
          console.log(res);
          if(res.data[0] == null) {
            that.setData({
              comeHidden:false,
              video: res.data[2]
            })
          } else {
            that.setData({
              film: res.data[0],
              teaFilm: res.data[1],
              video: res.data[2],
              standard: res.data[0][0].standard,
            })
          }
        }
      })
  },
  gobao:function(e) {
    var dingId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../baoming/baoming?id=" + dingId
    })
  },
  goDetail: function (e) {
    var filmid = e.currentTarget.dataset.uid;
    var videoid = e.currentTarget.dataset.vid;
    wx.navigateTo({
      url: "../detail/detail?uid=" + filmid + '&vid=' + videoid
    })
  },
  come:function() {
    wx.navigateTo({
      url: "../guize/guize"
    })
  }
})