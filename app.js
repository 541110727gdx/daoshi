//app.js
App({
  onLaunch: function() {
    wx.login({
      success: function (res) {
        if (res.code) {
          // console.log(res.code)
          var code = res.code;
          wx.request({
            method:'POST',
            url: 'https://message.sharetimes.cn/api/seven/openid',
            header: {//请求头
              'content-type': 'application/x-www-form-urlencoded'
            },
            data:{
              code: res.code
            },
            success:function(res) {
              // console.log(res)
              wx.setStorageSync('openId', res.data)
              console.log(wx.getStorageSync('openId'))
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    
  }
  // getUserInfo: function(cb) {
  //   var that = this
  //   if (this.globalData.userInfo) {
  //     typeof cb == "function" && cb(this.globalData.userInfo)
  //   } else {
  //     //调用登录接口
  //     wx.getUserInfo({
  //       withCredentials: true,
  //       success: function(res) {
  //         that.globalData.userInfo = res.userInfo
  //         console.log(res.userInfo)
  //         typeof cb == "function" && cb(that.globalData.userInfo)
  //       }
  //     })
  //   }
  // },
  // globalData: {
  //   userInfo: null
  // }
})