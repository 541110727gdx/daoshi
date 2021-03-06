// pages/detail/detail.js
const qiniuUploader = require("../../utils/qiniuUploader");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden:true,
    userImg:'',
    msg:'',
    imageHidden: true,
    videoHidden: true,
    addHidden: true,
    timeHiden: false,
    teaArr:[],
    loadingHidden:true,
    tabArr:'',
    vid:'',
    showView: false,
    stuHidden:false,
    teaHidden:true,
    array: ["北京", "上海", "天津", "重庆", "河北", "山西", "内蒙", "辽宁", "吉林", "黑龙江", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "广东", "广西", "海南", "四川", "贵州", "云南", "西藏", "陕西", "甘肃", "宁夏", "青海", "新疆", "香港", "澳门", "台湾", "其它"],
    xintai:["娱乐大众","专业院校学生","职业规划发展"],
    lixiang:["娱乐自嗨","专业进修，将来成为专业歌手","登上更大的舞台，成为艺人"]
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
    // console.log(options);
    that.setData({
      vid:options.vid,
      loadingHidden:false
    })
    wx.request({
      method:'POST',
      url: 'https://message.sharetimes.cn/api/square/videocontent',
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        video_id:options.vid
      },
      success:function(res) {
        console.log(res);
        that.setData({
          msg:res.data.data[0],
          loadingHidden:true
        })
        console.log(that.data.msg)
      }
    })
    wx.request({
      method:'POST',
      url: 'https://message.sharetimes.cn/api/seven/teadetail',
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        evaluate:options.vid
      },
      success:function(res) {
        // console.log(res)
        if(res.data.length == 0) {
          that.setData({
            teaArr: res.data,
            stuHidden:true
          })
        } else {
          that.setData({
            teaArr: res.data
          })
        }
        
        // console.log(that.data)
      }
    })
    //判断是否为导师
    if(wx.getStorageSync('teaNum')) {
      that.setData({
        stuHidden:true,
        teaHidden:false
      })
    } else {

    }
  },

  upLoadYin: function () {
    wx.startRecord({
      success: function (res) {
        var tempFilePath = res.tempFilePath
      },
      fail: function (res) {
        //录音失败
      }
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
  //视频上传七牛
  shipinUploadqiniuMethod: function (shipinFile, fileHead) {
    var that = this;
    that.setData({
      loadingHidden: false
    })
    var shipinName = shipinFile.substr(30, 50);
    qiniuUploader.upload(shipinFile, (res) => {
      // 　　　　console.log(res)
      that.setData({
        imageURL: res.imageURL,
        imageHidden: false,
        addHidden: false,
        loadingHidden: true,
        videoImage: 'http://' + res.imageURL + '?vframe/jpg/offset/4',
        videoUrl: 'http://' + res.imageURL
      })
      console.log(that.data.imageURL)
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
  submit: function () {
    var that = this;
    console.log(that.data.video_url)
    console.log(that.data.standard)
    if (that.data.imageURL && that.data.tabArr.curHdIndex) {
      wx.request({
        method: 'POST',
        url: 'https://message.sharetimes.cn/api/seven/teaqiniu',
        data: {
          video_url: that.data.imageURL,
          // openId: wx.getStorageSync('openId'),
          evaluate:that.data.vid,
          standard: that.data.tabArr.curHdIndex,
          evaId: wx.getStorageSync('evaId')
        },
        header: {//请求头
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if(res.data == 200) {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 1500
            })
            setTimeout(function() {
              wx.redirectTo({
                url: '../home/home',
              })
            },1500)
          } else {

          }
        }
      })

    } else {
      wx.showToast({
        title: '请添加视频评分',
        image: '../../img/error.png',
        duration: 2000
      })
    }
  },
  closeVideo: function () {
    this.setData({
      videoHidden: true
    })
  },
  showVideo: function () {
    this.setData({
      videoHidden: false
    })
  },
  delVideo: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '您确定删除此视频',
      success: function (res) {
        if (res.confirm) {
          that.setData({
            imageHidden: true,
            videoHidden: true,
          })
        } else if (res.cancel) {

        }
      }
    })

  }
})