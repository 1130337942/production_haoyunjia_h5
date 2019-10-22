<template>
  <div class="login" style="height: 100%;width: 100%;position: absolute;box-sizing: border-box;">
    <van-nav-bar title="绑定手机号" left-text left-arrow @click-left="onClickLeft" />

    <div style="padding:30px;">
      <div class="margin-bottom-10 label">绑定手机号</div>
      <!-- readonly
          clickable -->
      <van-cell-group>
        <van-field
          :value="ruleForm.phone"
          :input="onChange()"
          placeholder="请输入手机号"
          readonly
          clickable
          maxlength="11"
          :focused="showPhoneKeyboard"
          @touchstart.native.stop="showPhoneKeyboard = true;showKeyboard = false;"
        >
          <van-button slot="button" round :class="[ isVantButBg?'but1':'but2' ,'vantBut']" @click="sendCode">{{buttonText}}</van-button>
        </van-field>
      </van-cell-group>
      <div :class="isErrText?'err-text-show':'err-text-hide'" class="err-text">{{errText}}</div>

      <!-- 验证码输入框 -->
      <h1 class="h1-text">请输入收到的短信验证码</h1>
      <van-password-input
        :value="ruleForm.verifyCode"
        :length="4"
        :mask="false"
        :gutter="15"
        info="验证码为 4 位数字"
        :focused="showKeyboard"
        @focus="showKeyboard = true;showPhoneKeyboard = false"
      />

      <!-- 数字键盘 -->
      <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = false"
      />
      <van-number-keyboard
        v-model="ruleForm.phone"
        :show="showPhoneKeyboard"
        :maxlength="11"
        @blur="showPhoneKeyboard = false"
      />
    </div>
    <button class="button-width-90 submitBtn" @click="wxauth1">确定</button>
  </div>
</template>


<script>
import { wxauth, getWxVerifyCode, isPass } from "../../api/api";
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        phone: "",
        verifyCode: ""
      },
      showKeyboard: false,
      isErrText: false,
      buttonText: "发送验证码",
      flag: false,
      userMobile: "",
      intermediary: "110", //控制页面刷新时该去那个页面
      errText: "",
      isHas: false,
      isDisabled: true,// 是否禁止点击发送验证码按钮
      isVantButBg:true, // 按钮背景颜色
      showPhoneKeyboard:true,//手机号键盘
     
    };
  },
  created() {
    document.title = sessionStorage.getItem('title');
  },
  mounted() {},
  methods: {
    //手机号验证
    onChange() {
      let reg = /^1[3456789]\d{9}$/;
      // console.log(reg.test(this.ruleForm.phone))
      if (!reg.test(this.ruleForm.phone) && this.ruleForm.phone.length > 0) {
        this.isErrText = true;
        this.flag = false;
        this.errText = "请输入正确的手机号";
        this.isHas = true;
      } else {
        if (this.ruleForm.phone.length > 0 && reg.test(this.ruleForm.phone)) {
          // console.log(11111)
          this.isErrText = false;
          this.flag = true;
          this.errText = "请输入正确的手机号";
          this.isHas = true;
        } else if (this.isHas && this.ruleForm.phone.length == 0) {
          this.isErrText = true;
          this.flag = false;
          this.errText = "手机号不能为空";
        }
      }
    },
    //导航栏
    onClickLeft() {
      // alert("返回");
    },
    //键盘
    onInput(key) {
      this.ruleForm.verifyCode = (this.ruleForm.verifyCode + key).slice(0, 4);
    },
    onDelete() {
      this.ruleForm.verifyCode = this.ruleForm.verifyCode.slice(
        0,
        this.ruleForm.verifyCode.length - 1
      );
    },
    //发送验证码
    sendCode(e) {
      // e.preventDefault(); //取消button默认事件
      if (!this.isDisabled) return false;
      if (this.flag) {
        this.getWxVerifyCode1();
        if (this.ruleForm.phone) {
          let time = 60;
          this.buttonText = "已发送";
          this.flag = false;

          let timer = setInterval(() => {
            this.isVantButBg = false
            time--;
            this.buttonText = time + " 秒";
            if (time === 0) {
              clearInterval(timer);
              this.buttonText = "重新获取";
              this.isDisabled = true;
              this.flag = true;
              this.isVantButBg = true
            }
          }, 1000);
        }
      }
    },

    //登陆
    wxauth1() {
      var $cookie = this.$cookie;
      let param = {
        param: JSON.stringify({
          mobile: this.ruleForm.phone,
          verifyCode: this.ruleForm.verifyCode
        })
      };
      if (!this.flag || !this.ruleForm.verifyCode) return;
      wxauth(param)
        .then(result => {
          if (result.code == "000000") {
            // this.isPass1();
            this.$cookie.set("token", result.data.token);
            this.userMobile = result.data.mobile;
            this.$cookie.set("currentCompanyId", result.data.currentCompanyId); //公司ID
            this.$cookie.set(
              "currentCompanyName",
              result.data.currentCompanyName
            ); //公司名
            this.$cookie.set("mobile", this.userMobile); //手机号
            this.$router.push({ path: "/SignThePo" });
          } else if (result.code == "100000") {
            //this.$toast.fail(result.message);
            this.$toast.fail("系统错误");
          }
        })
        .catch(error => {
          //判断是否是401
          this.$router.push("/Login");
        });
    },
    //获取验证码
    getWxVerifyCode1() {
      let param = {
        param: JSON.stringify({
          mobile: this.ruleForm.phone,
          domain:window.location.host,
        })
      };
      getWxVerifyCode(param)
        .then(result => {
          this.isDisabled = false;
        })
        .catch(error => {
          alert("请求失败");
          //    console.log(error)
        });
    },
    //是否是自由职业者和是否已认证判断
    isPass1() {
      var $cookie = this.$cookie;
      let param = { param: JSON.stringify({}) };
      isPass(param)
        .then(result => {
          // console.log(result);
          if (result.code == "000000") {
            if (result.data.isFreelance == false) {
              //是否是自由职业者
              this.$router.push({ path: "/liberalProfessions" });
            } else if (result.data.isFreelance == true) {
              if (result.data.isAuth == false) {
                //是否已认证
                this.$router.push({ path: "/Autonym" });
              } else if (result.data.isAuth == true) {
                this.$cookie.set("intermediary", this.intermediary); //满足所有条件把110保存在cookie上面
                //  console.log(this.intermediary);
                this.$router.push({ path: "/SignThePo" });
              }
            }
          } else if (result.code == "100000") {
            //this.toast.fail(result.message);
            this.$toast.fail("系统错误");
          }
        })
        .catch(error => {
          //   alert('请求失败')
          //    console.log(error)
        });
    }
  }
};
</script>

<style lang='scss' scoped>
.input-box {
  position: relative;
}
.margin-bottom-10 {
  margin-bottom: 10px;
}
.label {
  font-size: 15px;
  line-height: 40px;
}
.err-text {
  color: #f56c6c;
  font-size: 12px;
  margin-top: 3px;
  position: absolute;
  transition: all 0.2s;
}
.err-text-show {
  height: 18px;
}
.err-text-hide {
  height: 0px;
  overflow: hidden;
}
.login {
  .van-cell-group {
    border-radius: 10em;
    overflow: hidden;
    box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.05);
  }
  .van-hairline--top-bottom::after {
    border-width: 0px;
  }
  .van-cell {
    padding: 6px 15px;
  }
  /deep/ .van-cell .van-cell__value {
    overflow: initial;
  }
  /deep/ .van-field__control{
    height: 40px;
    line-height: 40px;
  }  
  .vantBut{
    color: #fff;
    width: 100px;
    padding: 0px 10px;
  }
  .but1 {
    background: rgba(253, 100, 39, 1);
    box-shadow: 0px 30px 40px -10px rgba(253, 100, 39, 0.5);
  }
  .but2{
    background: #cccccc;
    pointer-events:none;
    box-shadow: 0px 30px 40px -10px rgba(121, 120, 119, 0.5);
  }
  .h1-text {
    font-size: 15px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin: 20px 15px;
  }
}


/* 获取验证码 */
.sendCodeBtn {
  width: 100px;
  padding: 0px 15px;
  color: rgba(255, 255, 255, 1);
  background: rgba(253, 100, 39, 1);
  box-shadow: 0px 30px 40px -10px rgba(253, 100, 39, 0.5);
  border: 0;
  border-radius: 24px;
}
.sendCodeBtn:focus,
.submitBtn:focus {
  outline: none;
}

/* 提交 */
.submitBtn {
  
  position: absolute;
  bottom: 15%;
  left: 5%;
}
</style>
