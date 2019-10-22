<template>
  <div class="autonym">
    <van-nav-bar title="实名认证" left-text left-arrow @click-left="onClickLeft" />
    <p style='color:#FD6427;margin:30px 15px 15px 15px;font-size:15px;font-family:PingFangSC;font-weight:500;'>请上传正确清晰本人证件信息，用作实名认证</p>
    <ul class="uploadPictures clearfix" style="padding: 0 15px 0 15px;">
      <li class="left box">
        <span class="row1"></span>
        <span class="row2"></span>
        <span class="col1"></span>
        <span class="col2"></span>
        <img :src="upImg" alt />
        <h1 v-if="flag2 == 1">{{sfzZm}}</h1>
        <h1 v-if="flag2 == 2" style='color:red;'>{{sfzZm1}}</h1>
        <input
          type="file"
          @change="upfile1"
          style="position:absolute;top: 0;width: 100%;left: 0;height: 100%;opacity: 0;"
        />
      </li>
      <li class="left box">
        <span class="row1"></span>
        <span class="row2"></span>
        <span class="col1"></span>
        <span class="col2"></span>
        <img :src="upImg2" alt />
        <h1 v-if="flag3 == 1">{{sfzFm}}</h1>
        <h1 v-if="flag3 == 3" style='color:red;'>{{sfzFm1}}</h1>
        <input
          type="file"
          @change="upfile2"
          style="position:absolute;top: 0;width: 100%;left: 0;height: 100%;opacity: 0;"
        />
      </li>
      <li class="left box">
        <span class="row1"></span>
        <span class="row2"></span>
        <span class="col1"></span>
        <span class="col2"></span>
        <img :src="upImg3" alt />
        <h1 v-if="flag4 == 1">{{yhkZm}}</h1>
        <h1 v-if="flag4 == 4" style='color:red;'>{{yhkZm1}}</h1>
        <input
          type="file"
          @change="upfile3"
          style="position:absolute;top: 0;width: 100%;left: 0;height: 100%;opacity: 0;"
        />
      </li>
      <li>
        <!-- <van-uploader
          v-model="fileList"
          multiple
          :max-count="1"
        />-->
      </li>
    </ul>
    <div>
      <van-cell-group>
        <van-field label="姓名" input-align='right' placeholder="请输入" v-model="userName" />
      </van-cell-group>
      <van-cell-group>
        <van-field label="身份证号" input-align='right' placeholder="请输入" v-model="idNumber" disabled='true' class='disabledClor'/>
        <img src="./../../assets/help_hint.png" alt="" @click=CaseHint(1) style='width:12px;height:12px;position: absolute;top: 50%;margin-top: -6px;left: 75px;'>
      </van-cell-group>
       <van-cell-group>
        <van-field label="手机号" input-align='right' placeholder="请输入" v-model="mobile" disabled='true' class='disabledClor'/>
      </van-cell-group>
      <van-cell-group>
        <van-field label="银行卡号" input-align='right' placeholder="请输入" v-model="bankCardNumber" disabled='true' class='disabledClor'/>
        <img src="./../../assets/help_hint.png" alt="" @click=CaseHint(2) style='width:12px;height:12px;position: absolute;top: 50%;margin-top: -6px;left: 76px;'>
      </van-cell-group>
    </div>
    
    <div v-if="flag == 1">
      <input type="text" placeholder="请输入" class="right" dir="rtl" v-model="authCode" />
      <button class="submit" @click="messageCertification1">点我</button>
    </div>

    <van-checkbox v-model="checked" checked-color="#FD6427" class="check-text fz12">我已同意《实名认证协议》、《电子签名申请协议》</van-checkbox>
    <button class="button-width-90 submit" @click="certification1">提交</button>

    <van-dialog
      use-slot
      title="短信验证码"
      v-model="show"
      show-cancel-button
      confirmButtonColor='#FFF'
      v-on:confirm="messageCertification1"
    >
      <!-- 验证码输入框 -->
      <div style="margin-top:10px">
        <van-cell-group>
          <van-field v-model="authCode" placeholder="请输入验证码" />
        </van-cell-group>
      </div>
    </van-dialog>

    <van-dialog
      v-model="show2"
      title="提示"
      message="请确认身份证件正确且为本人证件，一旦上传后不可更改"
      show-cancel-button
      confirmButtonColor='#FFF'
      v-on:confirm="dialog2Fn"
    >
    </van-dialog>

  </div>
</template>
<script>
import {
  messageCertification,
  certification,
  idBaiDuOcr,
  bankOcr,
  getDictItemsByCodes
} from "././../../api/api";


export default {
  name: "Autonym",
  data() {
    return {
      sfzZm: "身份证正面",
      sfzFm: "身份证反面",
      yhkZm: "银行卡",
      sfzZm1: "身份证号正面错误",
      sfzFm1: "身份证号反面错误",
      yhkZm1: "银行卡号错误",
      show: false,
      authCode: "",
      flag: "",
      flag2: "1",
      flag3: "1",
      flag4: "1",
      checked: true,
      userName: "",
      idNumber: "",
      mobile: this.$cookie.get("mobile"),
      bankCardNumber: "",
      thirdVerifyId: "",
      thirdAuthId: "",
      ruleForm: {
        //二次认证验证码
        verifyCode: ""
      },
      fileList: [], //上传图片
      showKeyboard: false,
      upImg: require("../../assets/front.png"), //默认图片显示
      upImg2: require("../../assets/behind.png"),
      upImg3: require("../../assets/bankCard.png"),
      fid: "",
      fid2: "",
      fid3: "",
      nationalData:[],//民族数据
      show2:false,
    };
  },
  methods: {
    //导航栏
    onClickLeft() {
      // this.$router.push({ path: "/Login" });
      this.$router.go(-1)
    },
    //上传
    upfile1(e) {
      //添加请求头
      var formData = new FormData();
      formData.append("file", e.target.files[0], e.target.files[0].name);
      formData.append("sscale", 0);
      formData.append("qscale", 0);
      //添加请求头
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      this.$axios
        .post(process.env.VUE_APP_dfs + "/fs/uploadsmall", formData, config)
        .then(result => {
          //  console.log(result)
          if (result.data.code == "200") {
            //  console.log(result);
            this.fid = result.data.data.fid;
            //	console.log(e.target.files[0])
            this.upImg = result.data.data.url;
            //  console.log(this.upImg)
            this.idBaiDuOcr1(1);
          } else if (result.data.code == "400") {
            this.$toast(
              "图片超过最大限制10M，上传失败。 参考解决方案： 1： 手工裁剪图片中多余部分   2： 图片发到微信聊天页面， 重新保存到本地，上传保存后的图片"
            );
          }
        });
    },
    //上传2
    upfile2(e) {
      //添加请求头
      var formData = new FormData();
      formData.append("file", e.target.files[0], e.target.files[0].name);
      formData.append("sscale", 0);
      formData.append("qscale", 0);
      //添加请求头
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      this.$axios
        .post(process.env.VUE_APP_dfs + "/fs/uploadsmall", formData, config)
        .then(result => {
          if (result.data.code == "200") {
            //  console.log(result);
            this.fid2 = result.data.data.fid;
            //	console.log(e.target.files[1])
            this.upImg2 = result.data.data.url;
            this.idBaiDuOcr1(2);
          } else if (result.data.code == "400") {
            this.$toast(
              "图片超过最大限制10M，上传失败。 参考解决方案： 1： 手工裁剪图片中多余部分   2： 图片发到微信聊天页面， 重新保存到本地，上传保存后的图片"
            );
          }
        });
    },
    //上传3
    upfile3(e) {
      //添加请求头
      var formData = new FormData();
      formData.append("file", e.target.files[0], e.target.files[0].name);
      formData.append("sscale", 0);
      formData.append("qscale", 0);
      //添加请求头
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      this.$axios
        .post(process.env.VUE_APP_dfs + "/fs/uploadsmall", formData, config)
        .then(result => {
          if (result.data.code == "200") {
            //  console.log(result);
            this.fid3 = result.data.data.fid;
            //	console.log(e.target.files[2])
            this.upImg3 = result.data.data.url;
            this.bankOcr1();
          } else if (result.data.code == "400") {
            this.$toast(
              "图片超过最大限制10M，上传失败。 参考解决方案： 1： 手工裁剪图片中多余部分   2： 图片发到微信聊天页面， 重新保存到本地，上传保存后的图片"
            );
          }
        });
    },
    //实名认证
    certification1() {
      if (!this.userName || !this.idNumber || !this.mobile || !this.bankCardNumber || !this.fid || !this.fid2 || !this.fid3 ) {
        this.$toast.fail("请填写完整信息！！！");
      } else {
        this.show2 = true;
        
        // Dialog.confirm({
        //   title: '提示',
        //   message: '请确认身份证件正确且为本人证件，一旦上传后不可更改',
        //   confirmButtonColor:'#FFFFFF',
        // }).then(() => {
        //   this.postCertification()
        // }).catch(() => {
        //   // on cancel
        // });
        
      }
    },
    //dialog2 提示框
    dialog2Fn(){
       this.postCertification()
    },
    //实名认证提交
    postCertification(){
      var $cookie = this.$cookie;
      let param = {
        param: JSON.stringify({
          secondCompanyId: this.$cookie.get("currentCompanyId"),
          userName: this.userName,
          idNumber: this.idNumber,
          mobile: this.mobile,
          bankCardNumber: this.bankCardNumber,
          idcardFront: this.fid,
          idcardBack: this.fid2,
          bankCardFront: this.fid3
        })
      };
      certification(param)
        .then(result => {
          if (result.code == "000000") {
            this.thirdVerifyId = result.data.thirdVerifyId;
            this.thirdAuthId = result.data.thirdAuthId;
            this.show = true;
          } else if (result.code == "100000") {
            this.$toast.fail(result.message);
            //this.$toast.fail('系统错误');
          }
        })
        .catch(error => {});
    },
    //验证码二次认证
    messageCertification1() {
      let param = {
        param: JSON.stringify({
          secondCompanyId: this.$cookie.get("currentCompanyId"),
          userName: this.userName,
          idNumber: this.idNumber,
          mobile: this.mobile,
          bankCardNumber: this.bankCardNumber,
          idcardFront: this.fid,
          idcardBack: this.fid2,
          bankCardFront: this.fid3,
          thirdVerifyId: this.thirdVerifyId,
          thirdAuthId: this.thirdAuthId,
          authCode: this.authCode
        })
      };
      messageCertification(param)
        .then(result => {
          if (result.code == "000000") {
            this.show = false;
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
    //身份证识别
    idBaiDuOcr1(cardSide) {
      var $cookie = this.$cookie;
      if (cardSide == "1") {
        let param = {
          param: JSON.stringify({
            imageUrl: this.upImg,
            cardSide: cardSide
          })
        };
        idBaiDuOcr(param)
          .then(result => {
            //  console.log(result.data.birthday);
            if (result.code == "000000" && result.data.risk_type == "normal" && result.data.image_status == "normal" ) {
              let sexType = this.Getsex(result.data.idNum) //性别
              let birthdayNum = this.GetBirthday(result.data.idNum); //生日
              let national = (result.data.national.split("族")).join(""); //民族
              let isTrue = this.nationalData.find((item)=>{
                return item.itemName === national
              })
              // console.log(isTrue)
             
              if(sexType != result.data.sex || birthdayNum != result.data.birthday || result.data.addr == ""|| !isTrue){
                this.$toast("图片识别失败，请按提示重新上传");
                return false
              }
           
              this.userName = "";
              this.idNumber = "";
              this.userName = result.data.name;
              this.idNumber = result.data.idNum;
              this.flag2 = "1";
            } else {
              this.userName = "";
              this.idNumber = "";
              this.flag2 = "2";
              this.$toast("图片识别失败，请按提示重新上传");
            }
          })
          .catch(error => {});
      } else if (cardSide == "2") {
        // console.log(this.upImg2);
        let param = {
          param: JSON.stringify({
            imageUrl: this.upImg2,
            cardSide: cardSide
          })
        };
        idBaiDuOcr(param)
          .then(result => {
            //  console.log(result);
            if (cardSide == "2") {
              if (
                result.code == "000000" &&
                result.data.risk_type == "normal" &&
                result.data.image_status == "normal"
              ) {
                this.flag3 = "1";
              } else {
                this.flag3 = "3";
              }
            }
          })
          .catch(error => {});
      }
    },
    //银行卡识别
    bankOcr1() {
      var $cookie = this.$cookie;
      let param = {
        param: JSON.stringify({
          imageUrl: this.upImg3
        })
      };
      bankOcr(param)
        .then(result => {
          if (result.code == "000000" && result.data.bank_name != "" && result.data.bank_card_number != "") {
            this.bankCardNumber = "";
            this.bankCardNumber = result.data.bank_card_number;
            this.flag4 = "1";
          } else {
            this.bankCardNumber = "";
            this.flag4 = "4";
          }
        })
        .catch(error => {});
    },
    //案例提示
    CaseHint(hint) {
      if (hint == "1") {
        this.$toast("如果身份证号错误，请重新上传身份证正面图片");
      } else if (hint == "2") {
        this.$toast("如果银行卡号错误，请重新上传银行卡正面图片");
      }
    },
    //根据身份证号码验证性别
    Getsex (psidno){
        var sexno,sex
        if(psidno.length==18){
            sexno=psidno.substring(16,17)
        }else if(psidno.length==15){
          this.$toast("只支持二代身份证");
          return false
        }else{
            // alert("错误的身份证号码，请核对！")
            this.$toast("图片识别失败，请按提示重新上传");
            return false
        }
        var tempid=sexno%2;
        if(tempid==0){
            sex='女'
        }else{
            sex='男'
        }
        return sex
    },
    //根据身份证号获得出生日期
    GetBirthday (psidno){
        var birthdayno,birthdaytemp
        if(psidno.length==18){
            birthdayno=psidno.substring(6,14)
        }else if(psidno.length==15){
            birthdaytemp=psidno.substring(6,12)
            birthdayno="19"+birthdaytemp
        }else{
            alert("错误的身份证号码，请核对！")
            return false
        }
        var birthday=birthdayno.substring(0,4)+birthdayno.substring(4,6)+birthdayno.substring(6,8)
        return birthday    
    },
    //请求民族数据字典
    postNational(){
      let param = {param:JSON.stringify({
        parentCode: "NAT"
      })}
      getDictItemsByCodes(param).then(result => {
        //  console.log(result)
        if (result.code == '000000') {
         
          let dataDictPOData = result.data[0].dataDictPO;
          let nationalArr = []
          for (let i = 0; i < dataDictPOData.length; i++) {
            let nationalObj = {};
            nationalObj.itemCode = dataDictPOData[i].itemCode;
            nationalObj.itemDesc = dataDictPOData[i].itemDesc;
            nationalObj.itemName = dataDictPOData[i].itemName;
            nationalArr.push(nationalObj)
          }
          this.nationalData = nationalArr
          sessionStorage.setItem("nationalData", JSON.stringify(nationalArr));
          
        } else if (result.code == '100000') {
          //this.$toast.fail(result.message);
          this.$toast.fail('系统错误');
        }
      })
      .catch(error => {
        //判断是否是401
        this.$router.push('/Login');
      });

    },
  },
  created() {
    var $cookie = this.$cookie;
    if (!sessionStorage.nationalData){
      this.postNational()
    }else{
      this.nationalData = JSON.parse(sessionStorage.nationalData)
    }
    
    // console.log(this.nationalData); 
    // console.log($cookie.get('token'))
  }
};
</script>

<style lang="scss" scoped>
@import "@/Style/public.scss";
.autonym{
  h1{
    font-size: 12px;
  }
  .check-text{
    padding:15px;
  }
  /deep/ .van-checkbox__label{
    color: $color1;
  }
  /deep/ .van-dialog__confirm{
    background-color: #fd6427;
  }
  /deep/ .van-field--disabled .van-field__control{
    color: #323233;
  }
}

.van-cell-group,.van-cell{
  background: transparent;
}
form {
  border-bottom: 1px #dedede solid;
  padding-bottom: 10px;
  margin-top: 15px;
}
input {
  border: 0;
  background: none;
}
input:focus {
  outline: none;
}
input::-ms-input-placeholder {
  text-align: right;
}
input::-webkit-input-placeholder {
  text-align: right;
}
/* 上图身份证 */
.uploadPictures {
  margin-top: 20px;
}
.uploadPictures li img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
.uploadPictures li {
  width: 45%;
  text-align: center;
  margin-bottom: 30px;
}
.uploadPictures li:nth-child(1) {
  margin-right: 10%;
}
/* 图片边角 */
.box {
  width: 50%;
  height: 100px;
  border-radius: 7px;
  position: relative;
}
.box span {
  position: absolute;
  padding: 8px;
}
.row1 {
  top: -1px;
  left: -2px;
  border-left: 1px solid $color1;
  border-top: 1px solid $color1;
  border-top-left-radius: 3px;
}
.row2 {
  top: -1px;
  right: -2px;
  border-right: 1px solid $color1;
  border-top: 1px solid $color1;
  border-top-right-radius: 3px;
}
.col1 {
  bottom: -2px;
  left: -2px;
  border-left: 1px solid $color1;
  border-bottom: 1px solid $color1;
  border-bottom-left-radius: 3px;
}
.col2 {
  bottom: -2px;
  right: -2px;
  border-right: 1px solid $color1;
  border-bottom: 1px solid $color1;
  border-bottom-right-radius: 3px;
}

/* 提交 */
.submit {
  margin-top: 15px;
  margin-bottom:30px;
  
}
</style>