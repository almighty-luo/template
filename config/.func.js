module.exports = {
  // 刚刚下载完模板，还没有移动到新建目录下
  beforeUserTem (cliGloble) {
    console.log('beforeUserTem', cliGloble)
  },
  // 已经移动到新建目录下和用户已经选择完毕，但是还未开始渲染
  beforeRendenTem () {

  },
  // 渲染完毕
  mouthedRendenTem () {

  }
}