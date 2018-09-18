//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    candidateList: [
      {
        id: 1,
        name: '张三',
        photoSrc: '../../assert/image/avatar.jpg',
        acquiredCount: 150,
      },
      {
        id: 2,
        name: '李四',
        photoSrc: '../../assert/image/avatar.jpg',
        acquiredCount: 130,
      },
      {
        id: 3,
        name: '王二',
        photoSrc: '../../assert/image/avatar.jpg',
        acquiredCount: 110,
      }
    ]
  },
  onLoad: function () {
  },
})
