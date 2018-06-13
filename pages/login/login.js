var app = getApp();
const url = require("../../utils/Wcache");
Page({
  data: {
    userInfo: {},
    isdisable: true,
    btnInfo: '获取验证码',
    code1: '',
    code2: '',
    phone: '',
    password: '',
    loadingHidden:true
  },
  //手机号输入框事件
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
    if (e.detail.value.length == 11) {
      this.setData({
        isdisable: false
      })
    } else {
      this.setData({
        isdisable: true
      })
    }
  },
  //输入密码
  passInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  login: function () {
    var that = this; 
    wx.request({
      url: 'https://message.sharetimes.cn/api/seven/master',
      method: "POST",
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        tel_phone: that.data.phone,
        password: that.data.password
      },
      success: function (res) {
        console.log(res);
        if (res.data[1] == 'true') {
          var timestamp3 = Date.parse(new Date());
          var ext2 = timestamp3 + 86400000;
          wx.setStorageSync('index_ext2', ext2);
          wx.setStorageSync('teaNum', that.data.phone);
          wx.setStorageSync('evaId', res.data[0])
          wx.navigateTo({
            url: "../homeTea/homeTea"
          })

        } else {
          var re = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
          if (re.test(that.data.phone)) {
            wx.request({
              method: 'POST',
              url: 'https://message.sharetimes.cn/api/seven/login',
              header: {//请求头
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                PhoneNum: that.data.phone,
                PassWord: that.data.password,
                // openId: wx.getStorageSync('openId')
              },
              success: function (res) {
                // console.log(wx.getStorageSync('openId'))
                console.log(res)
                if (res.data == '登录成功') {
                  var timestamp = Date.parse(new Date());
                  var ext = timestamp + 86400000;
                  wx.setStorageSync('index_ext', ext);
                  wx.setStorageSync('loginKey', that.data.phone);
                  that.setData({
                    loadingHidden:false
                  })
                  wx.redirectTo({
                    url: '../home/home'
                  })
                } else if (res.data == '您输入的密码不正确') {
                  wx.showToast({
                    title: '密码不正确',
                    image: '../../img/error.png',
                    duration: 2000
                  })
                } else {
                  wx.showToast({
                    title: '该手机号未注册',
                    image: '../../img/error.png',
                    duration: 2000
                  })
                }
              },
              error: function () {
                wx.showToast({
                  title: '出错了',
                  image: '../../img/error.png',
                  duration: 2000
                })
              }
            })
          } else {
            wx.showToast({
              title: '手机号不正确',
              image: '../../img/error.png',
              duration: 2000
            })
          }
        }
      }
    })
  },
  goRegister:function() {
    wx.navigateTo({
      url: '../register/register'
    })
  },
  goFind:function() {
    wx.navigateTo({
      url: '../find/find'
    })
  },
  onLoad: function () {
    // wx.clearStorage();
    var timestamp2 = Date.parse(new Date());
    var loginKey = wx.getStorageSync('loginKey');
    var teaNum = wx.getStorageSync('teaNum');
    var ext = wx.getStorageSync('index_ext');
    var ext2 = wx.getStorageSync('index_ext2');
    if (loginKey && ext > timestamp2) {//学员缓存过期时间
      wx.redirectTo({
        url: '../home/home'
      })
    } else if (teaNum && ext2 > timestamp2) {//导师缓存过期时间
      wx.redirectTo({
        url: '../homeTea/homeTea'
      })
    } else {
      wx.clearStorage();
    }
    
    wx.setStorageSync("userImg", 'http://b247.photo.store.qq.com/psb?/V10RQdNV3tmS94/J6ghmILeNG4*mQvY*K*scbqO6FcD6ack6VMg777yK6o!/m/dGoBAAAAAAAAnull&bo=yADIAAAAAAADByI!&rf=photolist&t=5')
    // var that = this
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    //   that.setData({
    //     userInfo: userInfo
    //   })
    //   console.log(that.data)
    //   wx.setStorageSync("userImg", that.data.userInfo.avatarUrl)
    // })
  }
})