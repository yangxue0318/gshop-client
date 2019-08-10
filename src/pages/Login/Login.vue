<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input
                type="tel"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
                name="phone"
                v-validate="'required|mobile'"
              />
              <button
                :disabled="!isRightPhone|| computerTime>0"
                class="get_verification"
                :class="{right_phone_number:isRightPhone}"
                @click.prevent="sendCode"
              >{{computerTime>0?`短信已发送(${computerTime}s)`:'获取验证码'}}</button>
              <span style="color: red;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
            </section>
            <section class="login_verification">
              <input
                type="tel"
                maxlength="8"
                placeholder="验证码"
                v-model="code"
                name="code"
                v-validate="{required: true, regex: /^\d{6}$/}"
              />
              <span style="color: red;">{{ errors.first('code') }}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input
                  type="text"
                  placeholder="用户名"
                  v-model="name"
                  v-validate="'required'"
                  name="用户名"
                />
                <span style="color: red;">{{ errors.first('用户名') }}</span>
              </section>
              <section class="login_verification">
                <input
                  :type="isShowPwd?'text':'password'"
                  placeholder="密码"
                  v-model="pwd"
                  name="密码"
                  v-validate="'required'"
                />

                <div
                  class="switch_button"
                  :class="isShowPwd?'on':'off'"
                  @click="isShowPwd=!isShowPwd"
                >
                  <div class="switch_circle" :class="{right:isShowPwd}"></div>
                  <span class="switch_text">{{isShowPwd ? 'abc' : ''}}</span>
                </div>
                <span style="color: red;">{{errors.first('密码')}}</span>
              </section>
              <section class="login_message">
                <input
                  type="text"
                  placeholder="验证码"
                  v-model="captcha"
                  name="验证码"
                  v-validate="{required: true, regex: /^.{4}$/}"
                />
                <img
                  class="get_verification"
                  src="	http://localhost:4000/captcha"
                  @click="updateCaptcha"
                 ref="captcha"/>
                <span style="color: red;">{{ errors.first('验证码') }}</span>
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import { reqSenCode, reqSmsLogin, reqPwdLogin } from "../../api";
import { Toast, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      loginWay: true, //true短信登录。、，false密码登录
      phone: "", //手机号
      code: "", //一次性短信验证码
      name: "", //用户名
      pwd: "", //密码
      captcha: "", //一次性图形验证码
      computerTime: 0, //计算剩余的时间
      isShowPwd: false //是否显示密码
    };
  },
  computed: {
    //是否是一个正确的号码
    isRightPhone() {
      return /^1\d{10}$/.test(this.phone);
    }
  },
  methods: {
    async sendCode() {
      this.computerTime = 10;
      const intervalId = setInterval(() => {
        //到达0时，自动停止
        if (this.computerTime === 0) {
          clearInterval(intervalId);
        } else {
          this.computerTime--;
        }
      }, 1000);
      const result = await reqSenCode(this.phone);
      if (result.code === 0) {
        Toast("信息发送成功");
      } else {
        //如果发送错误，清除定时器
        // alert(result.msg);
        MessageBox.confirm(result.msg);
        //停止计时
        this.computerTime = 0;
      }
    },

    //更新图片验证码
    updateCaptcha() {
      //指定src的值需要携带一个时间戳参数
      this.$refs.captcha.src ="	http://localhost:4000/captcha?time=" + Date.now();
    },

    async login() {
      const { loginWay, phone, name, pwd, code, captcha } = this;

      let result;
      let names;

      if (loginWay) {
        names = ["phone", "code"];
        this.$validator.validateAll(names);
        result = await reqSmsLogin(phone, code); //短信登录
        //this.updateCaptcha()
        //console.log(code);
      } else {
        names = ["用户名", "密码", "验证码"];
        this.$validator.validateAll(names);

        result = await reqPwdLogin({ name, pwd, captcha });
        //用户名密码登录
        //如果登陆失败，更新一下验证码，并清除输入
        console.log(result);
        if (result.code === 1) {
          this.updateCaptcha();
          this.captcha = "";
        }
      }
      //根据请求的结果进行响应处理
      if (result.code === 0) {
        const user = result.data;
        console.log(user)
        //将user保存在state中
        this.$store.dispatch("saveUser", user);
        //跳转到个人中心
        this.$router.replace("/profile");
      } else {
        MessageBox.alert(result.msg);
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixins.styl'
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone_number
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
