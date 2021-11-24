// 自定义使用教程组件
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
      }
    ],
    show: false
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
  },
  methods: {
    // 使用教程
    usage() {
      console.log('live播放');
      this.show = true
    },
    // 切换播放器
    switchPlayer(item) {
      console.log('当前点击的图标绑定的item数据:', item);
      // 调用原生 WebView 提供的 webView.addJavascriptInterface(this, xxx) 暴露的方法 callbackFn
     if (window['JsTest']) {
        //   console.log(true)
       window['JsTest'].convertData(JSON.stringify(item));
      } 
    }
  }
});
