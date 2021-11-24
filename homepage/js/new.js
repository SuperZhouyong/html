// =========================== 播放器 ===========================

// 动态插入的元素
var playerEleStr = '';

// 播放器字典表
var playerDict = [
  {
    id: 21001,
    link: "https://v.qq.com",
    img: "img/tengxun.png",
    name: "腾讯视频"
  },
  {
    id: 21002,
    link: "https://www.youku.com",
    img: "img/youku.png",
    name: "优酷"
  },
  {
    id: 21003,
    link: "https://www.iqiyi.com",
    img: "img/aiqiyi.png",
    name: "爱奇艺"
  },
  {
    id: 21004,
    link: "https://film.sohu.com",
    img: "img/souhu.png",
    name: "搜狐视频"
  },
  {
    id: 21005,
    link: "https://www.mgtv.com",
    img: "img/mgtv.png",
    name: "芒果TV",
    isPc: false
  },
  {
    id: 21006,
    link: "https://www.pptv.com",
    img: "img/pptv.png",
    name: "PPTV"
  },
  {
    id: 21007,
    link: "",
    img: "img/acfun.png",
    name: "acfun"
  },
  {
    id: 21008,
    link: "",
    img: "img/bilibili.png",
    name: "bilibili"
  },
  {
    id: 21009,
    link: "",
    img: "img/m1905.png",
    name: "m1905"
  },
  {
    id: 21010,
    link: "",
    img: "img/kuaikan.png",
    name: "快看"
  },
  {
    id: 21011,
    link: "",
    img: "img/migu.png",
    name: "咪咕"
  },
  {
    id: 21012,
    link: "",
    img: "img/shuqixiaoshuo.png",
    name: "书旗"
  },
  {
    id: 21013,
    link: "",
    img: "img/xiaohongshu.png",
    name: "小红书"
  },
  {
    id: 21014,
    link: "",
    img: "img/wangyiyun.png",
    name: "网易云"
  },
  {
    id: 21015,
    link: "https://v.qq.com",
    img: "img/ximalaya.png",
    name: "喜马拉雅",
    header: "Referer=www.mgtv.com||User-Agent=Mozilla/5.0&nbsp;(Windows&nbsp;NT&nbsp;10.0;&nbsp;Win64;&nbsp;x64)&nbsp;AppleWebKit/537.36&nbsp;(KHTML,&nbsp;like&nbsp;Gecko)&nbsp;Chrome/88.0.4324.150&nbsp;Safari/537.36"
  }
];

// 循环数据源添加元素
for (var index = 0; index < playerDict.length; index++) {
  var element = playerDict[index];
  playerEleStr += (
    '<div class="player" data-item=' + JSON.stringify(element) + ' >'
    + '<img class="icon" src="' + element.img + '" alt="">'
    + '<span class="title">' + element.name + '</span>'
    + '</div>'
  );
}

// 将元素挂载到容器里
document.getElementById('player').innerHTML = playerEleStr;

// 监听元素的点击事件
document.getElementById('player').addEventListener('click', function (e) {
  var parentNodeClassName = e.target.parentNode.className;
  var targetClassName = e.target.className;
  if (parentNodeClassName === 'player' || targetClassName === 'player') {
    var item = JSON.parse(e.target.parentNode.dataset.item || e.target.dataset.item);
    if (item.id > 21006) { // PPTV之后的任何图标都提示
      // 显示提示框浮层
      document.getElementById('tips').style.display = 'block';
      return;
    }
    // 调用原生 WebView 提供的 webView.addJavascriptInterface(this, xxx) 暴露的方法 callbackFn
    if (window['JsTest']) {
      window['JsTest'].convertData(JSON.stringify(item));
    }
  }
});



// =========================== 使用教程 ===========================

// 浮层元素
var usageEleStr = (
  '<div class="confirm-mask" id="usage">'
  + '<div class="wrapper">'
  + '<iframe src="//player.bilibili.com/player.html?aid=762453225&amp;bvid=BV1i64y1e7JF&amp;cid=391454108&amp;page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="allowfullscreen">'
  + '</iframe>'
  + '<div class="btns">'
  + '<span id="close-btn">关闭</span>'
  + '</div>'
  + '</div>'
  + '</div>'
);

// 字符串解析成元素节点类型
function parseElement(str) {
  var o = document.createElement('div');
  o.innerHTML = str;
  return o.childNodes[0];
}

// 显示浮层
document.getElementById('usage-btn').addEventListener('click', function (e) {
  document.body.appendChild(parseElement(usageEleStr));
  // 隐藏浮层
  document.getElementById('close-btn').addEventListener('click', function (e) {
    document.body.removeChild(document.getElementById('usage'))
  });
});


// =========================== 提示框 ===========================

// 隐藏浮层
document.getElementById('tips-confirm').addEventListener('click', function (e) {
  document.getElementById('tips').style.display = 'none';
});



// =========================== 页面挂在完成 ===========================

window.onload = function () {
//   const clipboard = new ClipboardJS('#wechat');
//   clipboard.on('success', function(e) {
//     const copyTxt = e.text;
//     console.log('当前复制的文本:', copyTxt);
//     // 调用原生 WebView 提供的 webView.addJavascriptInterface(this, xxx) 暴露的方法 callbackFn
//     if (window['xxx']) {
//       window['xxx'].callbackFn(item);
//     }
//     e.clearSelection();
//   });
  // 页面挂载之后找到全局中所有的 iframe，全部删除
  const elements = document.getElementsByTagName('iframe');
  while (elements.length) {
    elements[0].parentNode.removeChild(elements[0]);
  }
  if (window.top !== window.self) { window.top.location = window.location; }
}