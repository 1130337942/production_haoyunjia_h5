<template>
  <div class="liberalProfessions">
    <van-nav-bar title="自由职业者" left-text left-arrow @click-left="onClickLeft" />
    <div class="topTitle">
      <h1 style='font-size:15px;'>自由职业者评估</h1>
      <p
        style="margin-top:10px;"
      >你正在进行共享经济兼职生产经营评估，过程中可能需要你提供相关身份证明资料。如果你对评估存在争议，请放弃当前操作。继续完成则视为愿意承担经营风险。</p>
    </div>
    <div class="jobHolder">
      <h1 style='font-size:15px;'>自由职业者评估</h1>
      <ul class="clearfix" v-for="(item,index) of dataDictPO" :key="index">
        <li class="left" style="width:10%;margin: 10px 0 10px 0;">
         <van-checkbox v-model="checked" disabled></van-checkbox>
        </li>
        <li class="left" style="width:90%;margin: 10px 0 10px 0;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);">{{item.itemName}}</li>
        <li class="particulars" style="margin-left: 10%;">{{item.itemDesc}}</li>
        <li style="display:none">{{item.itemCode}}</li>
      </ul>
    </div>
    <div >
      <button class="button-width-90 confirm" @click="Confirm">确定</button>
    </div>

    <div style="display:none">
      <Login ref="idLogin"></Login>
    </div>
  </div>
</template>
<script>
import Login from "./../Login/Login";
import { freelanceCertification,getDictItemsByCodes } from "../../api/api";
export default {
  name: "liberalProfessions",
  components: {
    Login
  },
  data() {
    return {
      dataDictPO: [],
      checked:true
    };
  },
  created() {
    this.getDictItemsByCodes1();
   
  },
  methods: {
    //导航栏
    onClickLeft() {
      // this.$router.push({ path: "/Login" });
      this.$router.go(-1)
    },
    selectCheckbox(data, index) {
      this.dataDictPO[index].select = true;
      //console.log(this.dataDictPO)
      this.dataDictPO = Object.assign([], this.dataDictPO);
    },
    Confirm() {
      var arr = ''
      for (let i = 0; i < this.dataDictPO.length; i++) {
      	if (this.dataDictPO[i].select) {
      		arr += this.dataDictPO[i].itemCode
      		if (i != this.dataDictPO.length - 1) {
      			arr += ','
      		}
      	}
      }
      var $cookie = this.$cookie
        let param = {param:JSON.stringify({
            secondCompanyId: this.$cookie.get('currentCompanyId'),
      			professionType: arr,
      			mobile: this.$cookie.get('mobile')
          })
          }
        freelanceCertification(param).then(result => {
      		if (result.code == '000000') {
      			this.$refs.idLogin.isPass1() //调用登录页方法继续判断是否已认证
      		} else if (result.code == '100000') {
            //this.$toast.fail(result.message);
            this.$toast.fail('系统错误');
      		}
      	})
      	.catch(error => {
      	//判断是否是401
          this.$router.push('/Login');
        })
    },
    //获取公共字典自由职业者认证
    getDictItemsByCodes1() {
      var $cookie = this.$cookie;
        let param = {param:JSON.stringify({
             parentCode: "FLT"
          })
          }
        getDictItemsByCodes(param).then(result => {
          if (result.code == '000000') {
      			this.dataDictPO = result.data[0].dataDictPO;
            for (let i = 0; i < this.dataDictPO.length; i++) {
              if (!this.dataDictPO[i].select) {
                this.dataDictPO[i].select = true;
              }
            }
      		} else if (result.code == '100000') {
            //this.$toast.fail(result.message);
            this.$toast.fail('系统错误');
      		}
        })
        .catch(error => {
          //判断是否是401
          this.$router.push('/Login');
        });
    }
  }
 
};
</script>
<style lang='scss' scoped>
.liberalProfessions{
  width: 100%;
  height: 100%;
}
.topTitle {
  padding: 20px;
  box-sizing: border-box;
}
h1 {
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(51, 51, 51, 1);
}
.topTitle p {
  font-size:12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.jobHolder {
  background: rgba(255, 255, 255, 1);
  width: 90%;
  height: 55%;
  overflow-y: scroll;
  margin:0px auto;
  box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.02);
  border-radius: 16px;
  padding: 10px;
  box-sizing: border-box;
}
.particulars {
  font-size:13px;
  font-family:PingFangSC-Light;
  font-weight:300;
  color:rgba(153,153,153,1);
}
/* 确定 */
.confirm {
  margin-top: 3%;
}



</style>
