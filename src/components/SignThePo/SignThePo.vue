<template>
  <div>
    <!-- 顶部 -->
    <div class="topNav">
      <van-nav-bar title="e签宝" left-text left-arrow @click-left="onClickLeft" right-text="退出" @click-right="onClickRight"/>
      <ul class="clearfix topIcon">
        <li class="left">
          <img src="./../../assets/signature.png" style="width:35px;height:35px;" />
          <h1>我的签名</h1>
        </li>
        <li class="left">
          <img src="./../../assets/combo.png" style="width:35px;height:35px;" />
          <h1>签署文件</h1>
        </li>
        <li class="left">
          <img src="./../../assets/sign.png" style="width:35px;height:35px;" />
          <h1>购买套餐</h1>
        </li>
      </ul>
    </div>
    <!-- 悬空卡片 -->
    <div class="floatCard">
      <p class="clearfix" style="margin-bottom: 10px;">
        <span>我的文件</span>
        <span class="right">我的文件></span>
      </p>
      <ul class="clearfix">
        <li class="left">
          <span @click=list1(1) style='font-size:20px;font-family:PingFangSC-Medium;font-weight:500;color:rgba(51,51,51,1);'>{{waitSignCount}}</span>
          <p style='font-size:13px;font-family:PingFangSC-Light;font-weight:300;color:rgba(153,153,153,1);'>待签署</p>
        </li>
        <li class="left">
          <span @click=list1() style='font-size:20px;font-family:PingFangSC-Medium;font-weight:500;color:rgba(51,51,51,1);'>{{allCount}}</span>
          <p style='font-size:13px;font-family:PingFangSC-Light;font-weight:300;color:rgba(153,153,153,1);'>全部</p>
        </li>
      </ul>
    </div>
    <!-- 底部内容 -->
    <div class="details">
      <ul v-for="(item,index) of pcContInfoVOList" :key="index">
        <li class="rightContent clearfix">
          <h1 class="left">
            <span>{{item.contName}}</span><br>
            <span>
              <template v-if="item.signStatus == 1">待签署</template>
              <template v-else-if="item.signStatus == 2">草稿</template>
              <template v-else-if="item.signStatus == 3">生效中</template>
              <template v-else>已到期</template>
            </span>
          </h1>
          <p class="right">
            <span>
              <template v-if="item.signStatus == 1">
                <button class="signBtn" @click="sign(item.id)" style='background: rgba(253,100,39,1);'>签署</button>
              </template>
              <template v-else>
                <button class="signBtn" @click="sign(item.id)" style='background: white; border: 1px rgb(253, 100, 39) solid;color: rgb(253, 100, 39);'>查看</button>
              </template>
            </span>
          </p>
          <p style="display:none">{{item.id}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { logout,list,getSignUrl } from "../../api/api";
export default {
  name: "SignThePo",
  data() {
    return {
      allCount: "",
      waitSignCount: "",
      pcContInfoVOList: [] //列表
    };
  },
  methods: {
    //导航栏
    onClickLeft() {
      this.$router.push({ path: "/Login" });
    },
    //退出
    onClickRight(){
        this.$cookie.remove("token");
        this.$cookie.remove("intermediary");
      let param = {param:JSON.stringify({})}
         logout(param).then(result => {
          if(result.code == "000000"){
            this.router.push({ path: "/Login" });
          }else if(result.code == "100000"){
            //this.toast.fail(result.message);
            this.$toast.fail('系统错误');
          }
        })
        .catch(error => {
          //判断是否是401
          this.$router.push('/Login');
        });
    },
    list1(tab) {
      var $cookie = this.$cookie;    
      let param = {
          param: JSON.stringify({
            secondCompanyId: this.$cookie.get("currentCompanyId"),
            tab: tab
          }),
          pageParam: {
            pageIndex: 0, //第几页
            pageSize: 100 //每页几条
          }
        }
         list(param).then(result => {
          if (result.code == '000000') {
      			this.allCount = result.data.allCount; //全部
            this.waitSignCount = result.data.waitSignCount; //带签署
            this.pcContInfoVOList = result.data.pcContInfoVOList;
      		} else if (result.code == '100000') {
            //this.$toast.fail(result.message);
            this.$toast.fail('系统错误');
      		}
          
        })
        .catch(error => {
          //   alert('请求失败')
          //    console.log(error)
        });
    },
    //签署
    sign(name) {
      var $cookie = this.$cookie;
        let param = {
          param: JSON.stringify({
            contId: name
          })
        }
         getSignUrl(param).then(result => {
          let url = result.data.url;
          if (result.code == "000000") {
          window.location.href = `${url}?t=${new Date().getTime()}`;
          } else if (result.code == "100000") {
            this.$toast.fail('系统错误');
          }
        })
        .catch(error => {
          //   alert('请求失败')
          //    console.log(error)
        });
    }
  },
  created() {
    this.list1(1);
  }
};
</script>

<style scoped>

button:focus {
  outline: none;
}
/* 顶部 */
.topNav {
  background: rgba(253, 100, 39, 1);
  height: 170px;
}

/* 浮动卡片 */
.floatCard {
  width: 90%;
  height: 100px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.02);
  border-radius: 16px;
  position: absolute;
  top: 140px;
  left: 5%;
  padding: 15px;
  box-sizing: border-box;
}
.floatCard ul li {
  width: 50%;
  text-align: center;
}
.floatCard ul li span {
  font-size: 20px;
}
.floatCard p span {
  font-size: 12px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(51, 51, 51, 1);
}
/* 底部 */
.topIcon {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  color: rgba(255, 255, 255, 1);
}
.topIcon li {
  height: 22px;
  margin: 20px 20px 8px 20px;
  font-size: 14px;
  list-style: none;
  text-align: center;
  line-height: 22px;
  margin-top: 20px;
}
.topIcon li i {
  font-size: 25px;
}
.topIcon li h1{
  font-size:15px;font-family:PingFangSC-Light;font-weight:300;color:rgba(255,255,255,1);
}
.details {
  width: 90%;
  margin-left: 5%;
  margin-top: 85px;
}
.details ul {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.02);
  border-radius: 18px;
  padding: 15px;
  box-sizing: border-box;
  margin-top:10px;
}
.details ul .leftImg {
  width: 10%;
  height: 67px;
  border-radius: 16px;
}
.details ul .rightContent {
  width: 100%;
  padding-left: 10px;
  box-sizing: border-box;
}
.rightContent p span {
  font-size:11px;
  font-family:PingFangSC-Light;
  font-weight:300;
  color:rgba(51,51,51,1);
}
.rightContent p i {
  font-style: normal;
  font-size:11px;
  font-family:PingFangSC-Light;
  font-weight:300;
  color:rgba(153,153,153,1);
}
.rightContent h1 span {
  height:15px;
  font-size:16px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:#333333;
}
.rightContent h1 span:last-child{
  color:rgba(253,100,39,1);
  font-size: 13px;
  display: inline-block;
  margin-top: 10px;
}
.signBtn {
  width: 60px;
  height:36px;
  line-height: 36px;
  border-radius: 18px;
  cursor:pointer;
  border: 0;
  font-size:15px;
  font-family:PingFangSC-Light;
  font-weight:300;
  color:rgba(255,255,255,1);
  margin-top: 7px;
}





</style>
