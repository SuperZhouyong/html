// `使用教程`组件
Vue.component('Usage', {
  template: `
    <!-- 使用vue的transition添加过渡动画 -->
    <transition name="fade">
      <!-- 透明遮罩层 -->
      <div class="confirm-mask" v-if="showConfirm">
        <div class="wrapper">
          <!-- 视频播放器 -->
          <iframe src="//player.bilibili.com/player.html?aid=762453225&bvid=BV1i64y1e7JF&cid=391454108&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
          <!-- 操作按钮 -->
          <div class="btns">
            <span @click="cancel">{{ cancelText }}</span>
          </div>
        </div>
      </div>
    </transition>
  `,
  props: {
    // 父组件调用通过v-model属性传入
    value: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: '关闭'
    },
    confirmText: {
      type: String,
      default: '确认'
    }
  },
  data() {
    return {
      showConfirm: false // 控制弹框显示和隐藏
    }
  },
  watch: {
    // 因为无法在子组件直接修改props的value属性，所以借助value属性来修改data里面的showfirm属性
    value(val) {
      this.showConfirm = val
    }
  },
  methods: {
    cancel() {
      this.showConfirm = false
      this.$emit('input', false) // 重要， 在设修改子组件的showConfirm为false, 同时也要同步修改父组件中绑定了v-model的属性为false
    },
    confirm() {
      this.showConfirm = false
      this.$emit('input', false)
      this.$emit('confirm') // 派发confirm事件，供父组件调用
    }
  }
});


// tips提示组件
Vue.component('Alert', {
  template: `
    <!-- 初始状态下隐藏提示框 -->
    <div class="alert-mask" v-show="isShow">
      <div class="alert">
        <div class="flex">{{msg}}</div>
        <!-- alert插件只显示确定按钮 -->
        <div v-if="type === 'alert'">
          <div class="btnCommon success" @click="close">确定</div>
        </div>
        <!-- confirm插件显示取消和确定按钮 -->
        <div class="space-around" v-else>
          <div class="btnCommon cancel" @click="cancelEvent">取消</div>
          <div class="btnCommon success" @click="successEvent">确定</div>
        </div>
      </div>
      <!-- 背景遮罩 -->
      <div class="mask" @click="closeMask"></div>
    </div>
  `,
  data() {
    return {
      isShow: false // 控制弹框显示和隐藏
    }
  },
  props: {
    // 提示信息
    msg: {
      type: String,
      default: ''
    },
    // 是否显示提示框
    value: {
      type: Boolean,
      default: false
    },
    // 插件类型：alert/confirm
    type: {
      type: String,
      default: 'alert'
    },
    // confirm插件接收的确认事件
    success: {
      type: Function,
      default: () => {
        console.log('点击了success');
      }
    },
    // confirm插件接收的取消事件
    cancel: {
      type: Function,
      default: () => {
        console.log('点击了cancel');
      }
    }
  },
  watch: {
    // 因为无法在子组件直接修改props的value属性，所以借助value属性来修改data里面的showfirm属性
    value(val) {
      this.isShow = val
    }
  },
  methods: {
    // 关闭弹窗
    close() {
      this.isShow = false
      this.$emit('input', false) // 重要， 在设修改子组件的showConfirm为false, 同时也要同步修改父组件中绑定了v-model的属性为false
    },
    // alert 插件点击阴影区域关闭弹窗
    closeMask() {
      if (this.type === 'alert') {
        this.close();
      }
    },
    // confirm 插件点击取消触发的事件
    cancelEvent() {
      this.cancel();
      this.close();
    },
    // confirm 插件点击确定触发的事件
    successEvent() {
      this.success();
      this.close();
    }
  }
});


// Vue核心代码
const app = new Vue({
  el: '#app',
  data: {
    // 播放器字典表
    playerDict: [
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
        name: "芒果TV"
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
        id: 21014,
        link: "",
        img: "img/ximalaya.png",
        name: "喜马拉雅"
      }
    ],
    show: false,
    showTips: false,
    tips: '当前功能 正在开发，抱歉'
  },
  mounted() {
    const clipboard = new ClipboardJS('#wechat');
    clipboard.on('success', (e) => {
      const copyTxt = e.text;
      console.log('当前复制的文本:', copyTxt);
      // 调用原生 WebView 提供的 webView.addJavascriptInterface(this, xxx) 暴露的方法 callbackFn
      if (window['xxx']) {
        window['xxx'].callbackFn(item);
      }
      e.clearSelection();
    });
    // 页面挂载之后找到全局中所有的 iframe，全部删除
    const elements = document.getElementsByTagName('iframe');
    while (elements.length) {
      elements[0].parentNode.removeChild(elements[0]);
    }
    if (window.top !== window.self) { window.top.location = window.location; }
  },
  methods: {
    // 使用教程
    usage() {
      console.log('live播放');
      this.show = true
    },
    // 切换播放器
    switchPlayer(item, index) {
      console.log('当前点击的图标绑定的item数据:', item, index);
      if (index > 5) {
        this.showTips = true;
        // this.tips = 'xxx'; // 这里可以动态改变提示的文案
        return;
      }
      // 调用原生 WebView 提供的 webView.addJavascriptInterface(this, xxx) 暴露的方法 callbackFn
      if (window['JsTest']) {
        // console.log(true)
        window['JsTest'].convertData(JSON.stringify(item));
      } 
    }
  }
});
