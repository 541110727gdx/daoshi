// pages/detailTea/detailTea.js
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
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userImg: '',
    yinU: '',
    audioHidden2: true,
    userImg: '',
    gifHidden: true,
    audioHidden: true,
    luImgHidden: false,
    againHidden: true,
    doneHidden: true,
    yinpinHidden: true,
    wHidden: false,
    yinUrl: '',
    recodePath: '',
    msg: '',
    imageHidden: true,
    videoHidden: true,
    addHidden: true,
    timeHiden: false,
    teaArr: [],
    loadingHidden: true,
    tabArr: '',
    vid: '',
    showView: false,
    stuHidden: false,
    teaHidden: true,
    array: ["北京", "上海", "天津", "重庆", "河北", "山西", "内蒙", "辽宁", "吉林", "黑龙江", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "广东", "广西", "海南", "四川", "贵州", "云南", "西藏", "陕西", "甘肃", "宁夏", "青海", "新疆", "香港", "澳门", "台湾", "其它"],
    xintai: ["娱乐大众", "专业院校学生", "职业规划发展"],
    lixiang: ["娱乐自嗨", "专业进修，将来成为专业歌手", "登上更大的舞台，成为艺人"]
  },
  chooseicon: function (e) {
    var strnumber = e.target.dataset.id;
    var _obj = {};
    _obj.curHdIndex = strnumber;
    this.setData({
      tabArr: _obj
    });
    console.log(this.data.tabArr)
  },
  showZz: function () {
    var that = this;
    that.setData({
      showView: true
    })
  },
  hideZz: function () {
    this.setData({
      showView: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(wx.getStorageSync('teaNum'))
    // console.log(options);
    that.setData({
      vid: options.vid
    })
    wx.request({
      method: 'POST',
      url: 'https://message.sharetimes.cn/api/seven/index',
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        uid: options.uid,
        vid: options.vid,
        openId: wx.getStorageSync('openId')
      },
      success: function (res) {
        console.log(res);
        that.setData({
          msg: res.data
        })
        // console.log(that.data.msg.mentality)
      }
    })
    wx.request({
      method: 'POST',
      url: 'https://message.sharetimes.cn/api/seven/teadetail',
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        evaluate: options.vid
      },
      success: function (res) {
        console.log(res)
        that.setData({
          teaArr: res.data
        })
        console.log(that.data.teaArr)
      }
    })
    //判断是否为导师
    if (wx.getStorageSync('teaNum')) {
      that.setData({
        teaHidden: false
      })
    } else {

    }
  },

})