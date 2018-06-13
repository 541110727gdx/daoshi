function url(a) {
  var b = decodeURIComponent(a);
  // console.log(b);
  var c = b.split('&');
  var obj = {};
  for (var x in c) {
    var split = c[x].split('=');
    obj[split[0]] = split[1];
  }
  return obj;
}
function haha(a) {
  var b = a.split('tn=');
  var c = b[1].split('MD5');
  var d = decodeURIComponent(c[0]);
  var e = d.split('&');
  var obj = {};
  for (var x in e) {
    var split = e[x].split('=');
    obj[split[0]] = split[1];
  }
  // console.log(obj);
  return obj;
}
module.exports = {
  url:url,
  haha:haha
}