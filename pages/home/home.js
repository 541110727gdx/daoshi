//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    banner:[],
    startHidden:false,
    moneyHidden:true,
    loadingHidden:true,
    img:'timg.jpg',
    array: ["北京", "上海", "天津", "重庆", "河北", "山西", "内蒙", "辽宁", "吉林", "黑龙江", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "广东", "广西", "海南", "四川", "贵州", "云南", "西藏", "陕西", "甘肃", "宁夏", "青海", "新疆", "香港", "澳门", "台湾", "其它"],
    film: [
      
    ],
    hua: '',
    hasMore: true,
    showLoading: true,
    loadMoreLoading: false,
    start: 0
  },
  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad: function () {
    var that = this;
    that.setData({
      loadingHidden: false
    })
    wx.request({
      method:'Get',
      url: 'https://message.sharetimes.cn/api/seven/home',
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res) {
        console.log(res);
        that.setData({
          film:res.data,
          loadingHidden: true
        })
        console.log(that.data)
      },
      error:function() {
        console.log("出错了")
      }
    })
    wx.request({
      url: 'https://message.sharetimes.cn/api/square/bannerlist',
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res) {
        console.log(res)
        that.setData({
          banner:res.data.data
        })
      }
    })
    // wx.request({
    //   method: 'Get',
    //   url: 'https://message.sharetimes.cn/api/seven/tidbits',
    //   header: {//请求头
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   success:function(res) {
    //     // console.log(res);
    //     that.setData({
    //       hua:res.data
    //     })
    //     // console.log(that.data.hua)
    //   }
    // })
    // //判断是否为导师
    // if (wx.getStorageSync('teaNum')) {
    //   console.log(11)
    //   that.setData({
    //     startHidden:true,
    //     moneyHidden:false
    //   })
    // } else {
      
    // }
  },
  // goHua:function() {
  //   wx.navigateTo({
  //     url: '../hua/hua',
  //   })
  // },
  goDetail:function(e) {
    var filmid = e.currentTarget.dataset.uid;
    var videoid = e.currentTarget.dataset.vid;
    wx.navigateTo({
      url: "../detail/detail?uid=" + filmid + '&vid=' + videoid
    })
  },
  join:function() {
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
  goMy:function() {
    if (wx.getStorageSync('loginKey')) {
      wx.navigateTo({
        url: '../my/my'
      })
    } else {
      wx.navigateTo({
        url: '../login/login'
      })
    }
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
  }
})

