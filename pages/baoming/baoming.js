
const app = getApp()
const recorderManager = wx.getRecorderManager()

recorderManager.onStart(() => {
  console.log('recorder start')
})
recorderManager.onResume(() => {
  console.log('recorder resume')
})
recorderManager.onPause(() => {
  console.log('recorder pause')
})
recorderManager.onStop((res) => {
  console.log('recorder stop', res)
  const { tempFilePath } = res
  const temp = res.tempFilePath
})
recorderManager.onFrameRecorded((res) => {
  const { frameBuffer } = res
  // console.log('frameBuffer.byteLength', frameBuffer.byteLength)
})

const options = {
  duration: 6000000,
  sampleRate: 44100,
  numberOfChannels: 1,
  encodeBitRate: 192000,
  format: 'mp3',
  frameSize: 50
}
const qiniuUploader = require("../../utils/qiniuUploader");

// pages/baoming/baoming.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifOpen:true,
    yinUrl2:'',
    audioHidden2:true,
    userImg:'',
    gifHidden:true,
    audioHidden:true,
    luImgHidden:false,
    againHidden:true,
    doneHidden:true,
    yinpinHidden:true,
    wHidden:false,
    yinUrl:'',
    recodePath:'',
    imageHidden:true,
    videoHidden:true,
    addHidden:true,
    textDis:false,
    loadingHidden:true,
    clock:'',
    endClock:'',
    imageURL:'',
    token:'',
    showView: false,
    gong:'公开',
    array: ["北京", "上海", "天津", "重庆", "河北", "山西", "内蒙", "辽宁", "吉林", "黑龙江", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "广东", "广西", "海南", "四川", "贵州", "云南", "西藏", "陕西", "甘肃", "宁夏", "青海", "新疆", "香港", "澳门", "台湾", "其它"],
    index:'0',
    checkboxItems: [
      { name: '0', value: '娱乐大众' },
      { name: '1', value: '专业院校学生' },
      { name:'2',value:'职业规划发展'},
    ],
    checkbox2Items:[
      { name: '0', value: '娱乐自嗨' },
      { name: '1', value: '专业进修，将来成为专业歌手' },
      { name: '2', value: '登上更大的舞台，成为艺人' }
    ],
    radioItems: [
      {
        name: '../../img/boy2.png',sex:'1'
      },
      { 
        name: '../../img/girl2.png', sex: '2' 
      }
    ],
    hidden: false,
    userName:'',
    userSex:'',
    userAge:'',
    userCity:'',
    userOcc:'',
    userIdea:'',
    userDes:'',
    videoTitle:'',
    ifShi:'',
    payments_id:'',
    ifFree:''

  },
  onLoad: function (options) {
    console.log(options)
    var that = this;
    that.setData({
      ifShi:options.ifShi,
      payments_id:options.dingId,
      ifFree:options.ifFree
    })
  },
  // 姓名
  userName:function(e) {
    if (e.detail.value.length == 0) {
      wx.showToast({
        title: '请输入正确姓名',
        image: '../../img/error.png',
        duration: 2000
      })
    } else if (e.detail.value.length == 20){
      wx.showToast({
        title: '请输入正确姓名',
        image: '../../img/error.png',
        duration: 2000
      })
    } else {
      this.setData({
        userName: e.detail.value
      });
    }
  },
  //视频标题
  videoTitle:function(e) {
    var titleLength = e.detail.value.length;
    if (titleLength == 0) {
      wx.showToast({
        title: '请输入视频标题',
        image: '../../img/error.png',
        duration: 2000
      })
    } else if (titleLength > 30) {
      wx.showToast({
        title: '视频标题过长',
        image: '../../img/error.png',
        duration: 2000
      })
    } else {
      this.setData({
        videoTitle: e.detail.value
      });
    }
  },
  //性别
  userSex: function (e) {
    this.setData({
      userSex: e.detail.value
    });
  },
  //年龄
  userAge: function (e) {
    let reg = /^[0-9]{1,2}$/;
    if (!reg.test(e.detail.value)) {
      wx.showToast({
        title: '请输入正确年龄',
        image: '../../img/error.png',
        duration: 2000
      })
      this.setData({
        age: ''
      });
    } else {
      this.setData({
        userAge: e.detail.value
      });
    }
  },
  //城市
  userCity: function (e) {
    this.setData({
      index: e.detail.value,
      userCity:e.detail.value
    })
    console.log(this.data);
  },
  //职业
  userOcc: function (e) {
    let reg = /^[\u4E00-\u9FA5]+$/;
    if (reg.test(e.detail.value)) {
      this.setData({
        userOcc: e.detail.value
      });
    } else {
      wx.showToast({
        title: '请输入正确职业',
        image: '../../img/error.png',
        duration: 2000
      })
      this.setData({
        occ: ''
      });
    }
  },
  //心态
  userIdea:function(e) {
    this.setData({
      userIdea: e.detail.value
    });
  },
  //愿望
  userDes:function(e) {
    this.setData({
      userDes: e.detail.value
    });
  },
  showZz: function () {
    this.setData({
      showView: true,
      textDis: true
    })
  },
  hideZz: function () {
    this.setData({
      showView: false,
      textDis: false
    })
  },
  //视频上传七牛
  shipinUploadqiniuMethod: function (shipinFile, fileHead) {
    var that = this;
    that.setData({
      loadingHidden:false
    })
    var shipinName = shipinFile.substr(30, 50);
    qiniuUploader.upload(shipinFile, (res) => {
      that.setData({
        imageURL: res.imageURL,
        imageHidden:false,
        addHidden:false,
        wHidden:true,
        textDis: false,
        loadingHidden:true,
        videoImage: 'http://' + res.imageURL + '?vframe/jpg/offset/4',
        videoUrl: 'http://' + res.imageURL,
      })
    },
      (error) => {
        //视频上传失败，可以在七牛的js里面自己加了一个err错误的返回值
        console.log('error: ' + error)
      },
      {
        region: 'ECN',
        domain: 'oigqe693w.bkt.clouddn.com',
        uptokenURL: 'https://message.sharetimes.cn/api/seven/token',
        uploadURL: 'https://up.qiniup.com',
        key: fileHead + shipinName,// 自定义文件 keyregion:'ECN',//华东区域代码});
      })
  },
  //音频上传七牛
  yinpinUploadqiniuMethod: function (shipinFile, fileHead) {
    var that = this;
    that.setData({
      loadingHidden: false
    })
    var shipinName = shipinFile.substr(30, 50);
    qiniuUploader.upload(shipinFile, (res) => {
      // console.log(res);
      console.log(wx.getStorageSync('userImg'));
      that.setData({
        yinUrl2:res.imageURL,
        yinUrl: 'http://' + res.imageURL,
        audioHidden: false,
        userImg:wx.getStorageSync('userImg'),
        doneHidden:true,
        againHidden:false,
        imageHidden: false,
        wHidden: true,
        addHidden: false,
        textDis: false,
        loadingHidden: true,
      })
      // that.playVoice();
      // const innerAudioContext = wx.createInnerAudioContext()
      // innerAudioContext.src = that.data.yinUrl
      // innerAudioContext.onPlay(() => {
      //   console.log('开始播放')
      // })
      // innerAudioContext.onError((res) => {
      //   console.log(res.errMsg)
      //   console.log(res.errCode)
      // })
    },
      (error) => {
        //视频上传失败，可以在七牛的js里面自己加了一个err错误的返回值
        console.log('error: ' + error)
      },
      {
        region: 'ECN',
        domain: 'oigqe693w.bkt.clouddn.com',
        uptokenURL: 'https://message.sharetimes.cn/api/seven/token',
        uploadURL: 'https://up.qiniup.com',
        key: fileHead + shipinName,// 自定义文件 keyregion:'ECN',//华东区域代码});
      })
  },
  // playVoice: function (e) {
  //   const innerAudioContext = wx.createInnerAudioContext()
  //   var that = this;
  //   console.log(that.data.yinUrl);
  //   innerAudioContext.src = that.data.yinUrl;
  //   innerAudioContext.play();
  // },
  //提交
  submit:function() {
    var that = this;
    console.log(that.data)
    if (that.data.userName && that.data.userSex && that.data.userAge && that.data.index && that.data.userOcc && that.data.userIdea && that.data.userDes && that.data.imageURL) {//视频
      that.setData({
        loadingHidden:false
      })
      wx.request({
        url: "https://message.sharetimes.cn/api/seven/qiniuinfo",
        method: "POST",
        header: {//请求头
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          username: that.data.userName,
          sex: that.data.userSex,
          age: that.data.userAge,
          city: that.data.index,
          jop: that.data.userOcc,
          mentality: that.data.userIdea,
          ideality: that.data.userDes,
          title: that.data.videoTitle,
          video_url: that.data.imageURL,
          openId: wx.getStorageSync('openId'),
          payments_id: that.data.payments_id,
          dateId: wx.getStorageSync('dateId'),
          ifOpen: that.data.ifOpen,
          ifShi:that.data.ifShi,
          type:'0'
        },
        success: function (res) {
          console.log(res)
          if (res.data == true) {
            if (that.data.ifFree) {//免费名额
              wx.request({
                url: 'https://message.sharetimes.cn/api/square/paymentsid',
                header: {//请求头
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  type: 2
                },
                success: function (res) {
                  that.setData({
                    loadingHidden: true
                  })
                  wx.redirectTo({
                    url: "../success/success"
                  })
                }
              })
            } else {
              that.setData({
                loadingHidden: true
              })
              wx.redirectTo({
                url: "../success/success"
              })
            }
            
          }
        }
      })
    } else if (that.data.userName && that.data.userSex && that.data.userAge && that.data.index && that.data.userOcc && that.data.userIdea && that.data.userDes && that.data.yinUrl2 && that.data.videoTitle){//音频
      console.log(that.data)
      that.setData({
        loadingHidden: false
      })
      wx.request({
        url: "https://message.sharetimes.cn/api/seven/qiniuinfo",
        method: "POST",
        header: {//请求头
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          type: '1',
          video_url: that.data.yinUrl2,
          username: that.data.userName,
          sex: that.data.userSex,
          age: that.data.userAge,
          city: that.data.index,
          jop: that.data.userOcc,
          mentality: that.data.userIdea,
          ideality: that.data.userDes,
          title: that.data.videoTitle,
          payments_id: that.data.payments_id,
          openId: wx.getStorageSync('openId'),
          dateId: wx.getStorageSync('dateId'),
          userImg: wx.getStorageSync('userImg'),
          ifOpen: that.data.ifOpen,
          ifShi: that.data.ifShi,
        },
        success: function (res) {
          if (res.data == true) {
            if (that.data.ifFree) {//免费名额
              wx.request({
                url: 'https://message.sharetimes.cn/api/square/paymentsid',
                header: {//请求头
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  type: 2
                },
                success: function (res) {
                  that.setData({
                    loadingHidden: true
                  })
                  wx.redirectTo({
                    url: "../success/success"
                  })
                }
              })
            } else {
              that.setData({
                loadingHidden: true
              })
              wx.redirectTo({
                url: "../success/success"
              })
            }
          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写选择全部信息',
        success: function (res) {
          if (res.confirm) {
            
          } else if (res.cancel) {
            
          }
        }
      })
    }
  },
  startLu: function () {
    var that = this;
    that.setData({
      doneHidden:false,
      luImgHidden: true,
      gifHidden:false
    })
    recorderManager.start(options);
  },  
  //点击文本域
  tapTextarea1:function(e) {
    var that = this;
    that.setData({
      userIdea: e.detail.value
    })
  },
  tapTextarea2: function (e) {
    var that = this;
    that.setData({
      userDes: e.detail.value
    })
  },
  chooseVideo: function (res) {
　　var that = this;
  　　wx.chooseVideo({
         sourceType: ['album', 'camera'],
      　　maxDuration: 60,
  　　　　success: function (res) {
    　　　　var shipinFile = res.tempFilePath;
    　　　　that.setData({
      　　　　src: shipinFile
    　　    });
    　　    that.shipinUploadqiniuMethod(shipinFile, "shipin_");
  　　    }
　　})
    that.hideZz()
  },
  
  closeVideo:function() {
    this.setData({
      videoHidden:true,
      textDis: false
    })
  },
  showVideo:function() {
    this.setData({
      videoHidden:false,
      textDis:true
    })
  },
  delVideo:function() {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '您确定删除此视频',
      success: function (res) {
        if (res.confirm) {
          that.setData({
            imageHidden: true,
            videoHidden: true,
            wHidden:false
          })
        } else if (res.cancel) {
          
        }
      }
    })
    
  },
  //音频录制显示
  showYin:function() {
    var that = this;
    that.setData({
      yinpinHidden:false
    })
  },
  yinDone:function() {
    var that = this;
    that.setData({
      doneHidden:false,
      gifHidden: true
    })
    recorderManager.onStop((res) => {
      console.log('recorder stop', res)
      const { tempFilePath } = res
      // setTimeout(function () {
        that.yinpinUploadqiniuMethod(res.tempFilePath, "yinpin_");
      // }, 1000)
    })
    recorderManager.stop()
  },
  //重录
  again:function() {
    var that = this;
    that.setData({
      luImgHidden:false,
      doneHidden:true,
      audioHidden:true,
      againHidden:true
    })
  },
  //使用音频
  useYin:function() {
    var that = this;
    that.setData({
      luImgHidden: false,
      doneHidden: true,
      audioHidden: true,
      againHidden: true,
      wHidden:true,
      yinpinHidden:true,
      audioHidden2:false,
      imageHidden:true,
      videoHidden:true
    })
    that.hideZz();
  },
  switch1Change: function (e) {
    var that = this;
    that.setData({
      ifOpen: e.detail.value
    })
    if (e.detail.value == false) {
      that.setData({
        gong: '不公开'
      })
    } else {
      that.setData({
        gong: '公开'
      })
    }
    console.log(e.detail.value)
  }
}) 
