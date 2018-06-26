// pages/guize/guize.js
const times = require("../../utils/times");
const url = require("../../utils/url");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgg:'',
    loadingHidden:false,
    orderNo:'',
    nonceStr:'',
    package:'',
    paySign:'',
    top:'',
    act:true,
    act1:false,
    jingZz:true,
    jing:true,
    payHidden:false,
    pay2Hidden:true,
    timeHiden: false,
    moneyList:'',
    dingId:'',
    dateId:'',
    inputValue:'0.00',
    appid:'wx6afc15bd137e4c72',
    mch_id:'00817091924679',
    selected: true,
    selected1: false,
    ifShi:'1',
    listData: []
  },
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })
  },
  gogo:function() {
    wx.navigateTo({
      url: '../baoming/baoming'
    })
  },
  onLoad:function() {
    var that = this;
    wx.request({
      url: 'https://message.sharetimes.cn/api/seven/activity',
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res) {
        console.log(res);
        if (res.data.pay_amount == '名额已用完，请进入竞价报名') {
          that.setData({
            payHidden: true,
            pay2Hidden: false,
            loadingHidden:true,
            moneyList: res.data,
          })
        } else {
          that.time(res.data.activity_begin, res.data.current)
          times.date(res.data.activity_end, 'Y/M/D h:m', that),
          wx.setStorageSync('dateId', res.data.id);
          that.setData({
            dateId: res.data.id,
            moneyList: res.data,
            loadingHidden:true
          })
        }
        
      }
    })
    //排行榜
    wx.request({
      url: 'https://message.sharetimes.cn/api/seven/top',
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res) {
        console.log(res)
        that.setData({
          top:res.data
        })
      }
    })
  },
  time: function (timeOver, timeNow) {
    var timeOver = timeOver;
    var timeNow = timeNow;
    var timeDis;
    timeDis = timeOver - timeNow
    console.log(timeDis)
    times.count_down(this, timeDis);
  },
  validMoney:function() {
    var that = this;
    var inputValue = that.data.inputValue;//输入价格
    var compete_money = that.data.moneyList.compete_money;//低价
    var parameter = that.data.moneyList.parameter;//等级
    var dis = inputValue - compete_money
    if (inputValue !== '0.00' && inputValue !== null) {
      if (inputValue = compete_money || inputValue > compete_money) {
        if (dis % parameter == 0) {
          // console.log(1)
          return true;
        } else {
          // console.log(2)
          return false;
        }
      } else {
        // console.log(3)
        return false;
      }
    } else {
      // console.log(4)
      return false;
    }
      
  },
  //支付 定价
  payMoney1:function() {
    var that = this;
    if (that.data.moneyList.pay_amount == 0) {//免费
      wx.request({
        method: 'POST',
        url: 'https://message.sharetimes.cn/api/seven/payment',
        header: {//请求头
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          openId: wx.getStorageSync('openId'),
          mhtOrderAmt: '0',
          dateId: that.data.dateId,
          type: '2',
        },
        success: function (res) {
          console.log(res);
          console.log(url.url(res.data));
          var msg2 = url.haha(res.data);
          var msg = url.url(res.data);
          that.setData({
            nonceStr: msg.nonceStr,
            package: msg.prepay_id,
            paySign: msg.paySign,
            timestamp: String(msg2.timeStamp)
          })
          wx.requestPayment({
            'appId': 'wx6afc15bd137e4c72',
            'timeStamp': that.data.timestamp,
            'nonceStr': that.data.nonceStr,
            'package': 'prepay_id=' + that.data.package,
            'signType': 'MD5',
            'paySign': that.data.paySign,
            'success': function (res) {
              
              wx.request({
                url: 'https://message.sharetimes.cn/api/square/paymentsid',
                header: {//请求头
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success:function(res) {
                  console.log(res);
                  that.setData({
                    loadingHidden: false,
                    dingId:res.data
                  })
                  var ifShi = that.data.ifShi;
                  wx.redirectTo({
                    url: '../baoming/baoming?ifShi=' + ifShi + '&dingId=' + that.data.dingId
                  })
                }
              })
              
            },
            'fail': function (res) {
              // console.log('timeStamp:'+that.data.timestamp); 
              // console.log('nonceStr:' + that.data.nonceStr);
              // console.log('package:prepay_id=' + that.data.package);
              // console.log('paySign:' + that.data.paySign)
              console.log(res);
            }
          })
        }
      })
    } else {
      wx.request({//定价
        method: 'POST',
        url: 'https://message.sharetimes.cn/api/seven/payment',
        header: {//请求头
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          openId: wx.getStorageSync('openId'),
          mhtOrderAmt: that.data.inputValue,
          dateId: that.data.dateId,
          type: '0',
        },
        success: function (res) {
          console.log(res);
          console.log(url.url(res.data));
          var msg2 = url.haha(res.data);
          var msg = url.url(res.data);
          that.setData({
            nonceStr: msg.nonceStr,
            package: msg.prepay_id,
            paySign: msg.paySign,
            timestamp: String(msg2.timeStamp)
          })
          wx.requestPayment({
            'appId': 'wx6afc15bd137e4c72',
            'timeStamp': that.data.timestamp,
            'nonceStr': that.data.nonceStr,
            'package': 'prepay_id=' + that.data.package,
            'signType': 'MD5',
            'paySign': that.data.paySign,
            'success': function (res) {
              console.log(res);
              that.setData({
                loadingHidden: false
              })
              var ifShi = that.data.ifShi;
              wx.redirectTo({
                url: '../baoming/baoming?ifShi=' + ifShi
              })
            },
            'fail': function (res) {
              // console.log('timeStamp:'+that.data.timestamp); 
              // console.log('nonceStr:' + that.data.nonceStr);
              // console.log('package:prepay_id=' + that.data.package);
              // console.log('paySign:' + that.data.paySign)
              console.log(res);
            }
          })

        }
      })
    }
  },
  payMoney2: function () {//竞价
    var that = this;
    if (that.validMoney()) {
      
    	wx.request({
              method: 'POST',
              url: 'https://message.sharetimes.cn/api/seven/payment',
              header: {//请求头
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: {
                openId: wx.getStorageSync('openId'),
                mhtOrderAmt: that.data.inputValue,
                dateId: that.data.dateId,
                type: '1',
              },
              success: function (res) {
                
                console.log(res);
                console.log(url.url(res.data));
                var msg2 = url.haha(res.data);
                var msg = url.url(res.data);
                that.setData({
                  nonceStr: msg.nonceStr,
                  package:msg.prepay_id,
                  paySign: msg.paySign,
                  timestamp: String(msg2.timeStamp),
                  
                })
                wx.requestPayment({
                  'appId': 'wx6afc15bd137e4c72',
                  'timeStamp': that.data.timestamp,
                  'nonceStr': that.data.nonceStr,
                  'package': 'prepay_id=' + that.data.package,
                  'signType': 'MD5',
                  'paySign': that.data.paySign,
                  'success': function (res) {
                    console.log(res);
                    wx.redirectTo({
                      url: '../baoming/baoming'
                    })
                  },
                  'fail': function (res) {
                    console.log(res);
                  }
                })
              },
              fail:function(res) {
                console.log(res);
                that.setData({
                  msgg: res
                })
              }
          })
    } else {
      wx.showToast({
        title: '请按规定竞价',
        image: '../../img/error.png',
        duration: 2000
      })
    }
  },
  inputMoney:function(e) {
    this.setData({
      inputValue:e.detail.value
    })
  },
  jing:function() {
    var that = this;
    that.setData({
      jing:false,
      jingZz:false
    })
  },
  know:function() {
    var that = this;
    that.setData({
      jing:true,
      jingZz:true
    })
  },
  act:function() {//视频回复
    var that = this;
    that.setData({
      act:true,
      act1:false,
      ifShi:'1'
    })
  },
  act1: function () {//音频回复
    var that = this;
    that.setData({
      act: false,
      act1: true,
      ifShi:'2'
    })
  }
})