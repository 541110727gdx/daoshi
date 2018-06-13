
function count_down(that,timestamp) {
  // 渲染倒计时时钟
  that.setData({
    clock: date_format(timestamp)
  });
  if (timestamp < 60 ) {
    that.setData({
      timeHiden:true
    });
    // timeout则跳出递归
    return;
  }
  setTimeout(function () {
    // 放在最后--
    timestamp -= 60;
    count_down(that, timestamp);
  }
    , 60000)
}
// 时间格式化输出
function date_format(timestamp) {
  //天数
  var day = Math.floor(timestamp / 86400);
  // 小时位
  var hour = Math.floor(timestamp / 60 / 60 % 24);
  // 分钟位
  var min = fill_zero_prefix(Math.floor(timestamp / 60 % 60));
  return day + "天" + hour + "时" + min + "分";
}
  function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }  
  function formatTime(number, format) {

    var formateArr = ['Y', 'M', 'D', 'h', 'm'];
    var returnArr = [];

    var date = new Date(number * 1000);
    console.log(date)
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));

    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));

    for (var i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
}

function date(a,b,c) {
  c.setData({
    endClock: formatTime(a,b)
  });
}

// 位数不足补零
function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}

module.exports = {
  count_down: count_down,
  date: date
}