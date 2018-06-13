function aa (a) {
  var gameId = a.substring(0,a.lastIndexOf(" "))
  return gameId;
}
module.exports = {
  aa:aa
}