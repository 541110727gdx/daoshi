var app = getApp()
Page({
  data: {
    userInfo: {},
    isdisable:true,
    btnInfo:'验证码',
    code1:'',
    code2:'',
    phone:'',
    password:''
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
  passInput:function(e) {
    this.setData({
      password: e.detail.value
    })
  },
  //获取验证码
  getCode:function() {
    var that = this
    var count = 60;
    var re = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
    if (!re.test(that.data.phone)) {
      wx.showToast({
        title: '手机号不正确',
        image: '../../img/error.png',
        duration: 2000
      })
      return false;
    } else {
      if (that.data.isdisable == false) {
        that.sendcode()
        var timer = setInterval(function () {
          count--;
          if (count >= 1) {
            that.setData({
              btnInfo: count + 's',
              isdisable : true
            })
          } else {
            that.setData({
              btnInfo: '获取验证码',
              isdisable : false
            })
            clearInterval(timer);
            
          }
        }, 1000);
        
      }
    }  
  },
  sendcode:function() {
    var that = this
    console.log(that.data.phone)
    wx.request({
      method:'POST',
      url: 'https://message.sharetimes.cn/api/seven/phone',
      data:{
        PhoneNum:that.data.phone
      },
      success:function(res) {
        that.setData({
          code1:res.data
        })
        console.log(that.data.code1)
      },
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded'
      },
    })
  },
  
  //验证码输入框
  codeInput:function(e) {
    this.setData({
      code2: e.detail.value
    })
  },
  bindNum: function () {
    var re = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
    var pass = /^[\w]{6,12}$/;
    var that = this
    if (re.test(that.data.phone)) {
      if(pass.test(that.data.password)) {
        if (that.data.code1 != null && that.data.code2 != null && (that.data.code1 == that.data.code2)) {
          wx.request({
            method:'POST',
            url: 'https://message.sharetimes.cn/api/seven/binding',
            header: {//请求头
              'content-type': 'application/x-www-form-urlencoded'
            },
            data:{
              PhoneNum: that.data.phone,
              PassWord:that.data.password,
              openId:wx.getStorageSync('openId')
            },
            success:function(res) {
              // console.log(wx.getStorageSync('openId'))
              console.log(res)
              if(res.data == 200) {
                wx.setStorageSync('loginKey', that.data.phone);
                wx.navigateTo({
                  url: '../home/home'
                })
              } else if (res.data == '您已注册，请返回登录') {
                wx.showToast({
                  title: '手机号已注册',
                  image: '../../img/error.png',
                  duration: 2000
                })
              } else {
                wx.showToast({
                  title: '出错了',
                  image: '../../img/error.png',
                  duration: 2000
                })
              }
            },
            error:function() {
              wx.showToast({
                title: '出错了',
                image: '../../img/error.png',
                duration: 2000
              })
            }
          })
        } else {
          wx.showToast({
            title: '验证码不正确',
            image: '../../img/error.png',
            duration: 2000
          })
        }
        
      } else {
        wx.showToast({
          title: '密码格式错误',
          image: '../../img/error.png',
          duration: 2000
        })
      }
    } else {
      wx.showToast({
        title: '手机号不正确',
        image: '../../img/error.png',
        duration: 2000
      })
    }
      

  },
  
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
      console.log(that.data)
    })

  }
})