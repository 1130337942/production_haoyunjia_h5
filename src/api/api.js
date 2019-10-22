import axios from 'axios'
import cookie from 'js-cookie';
import qs from 'qs'
let $cookie = cookie; 

let VUE_APP_basic = process.env.VUE_APP_basic
let VUE_APP_export = process.env.VUE_APP_export
// let VUE_APP_dfs = process.env.VUE_APP_dfs

//配置 1 登陆不需要token
//超时时间
const LoginAxios = axios.create({
  timeout: 60000 
})
LoginAxios.interceptors.response.use(data => {
  if (data.data.code ===  401) {
    window.location.hash = '/login'
  }
  return data
}, error => {
  if(error.request.status == 0){
    alert('请求超时');
    window.location.hash = '/Login'
  }
  return Promise.reject(error)
})
//post请求
export function LoginPost (url, prama) {
  return new Promise((resolve, reject) => {
    LoginAxios({
      url: url,
      method: 'post',
      data: prama
    }).then(res => {
      resolve(res.data)
    }).catch(e => {
      reject(e)
    })
  })
}

//配置 2 带token的接口
//超时时间
const service = axios.create({
  timeout: 60000 
})
//拦截axios请求加token
service.interceptors.request.use(config => {
  if ($cookie.get('token')) {
    config.headers['Authorization'] = $cookie.get('token')
  }
  return config
},error => {
  return Promise.reject(error) 
});
service.interceptors.response.use(data => {
  if (data.data.code ===  401) {
    window.location.hash = '/login'
  }
  return data;
}, error => {
  if(error.request.status == 0){
    alert('请求超时');
    window.location.hash = '/Login'
  }
  return Promise.reject(error);
});
//post请求
export function AxiosPost (url, prama) {
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'post',
      data: prama
    }).then(res => {
      resolve(res.data);
    }).catch(e => {
      reject(e);
    });
  });
}
//文件上传专用
export function AxiosFilePost (url, prama) {
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'post',
      prama,
      headers: {
        'content-type': 'multipart/form-data'
      },
      withCredentials: true
    }).then(res => {
      resolve(res.data)
    }).catch(e => {
      reject(e)
    })
  })
}
//登陆
export function wxauth (params) {
  const url = VUE_APP_basic + '/pc/rest/wxauth'
  const param = params
  return  LoginPost(url, param)
}
//获取验证码
export function getWxVerifyCode (params) {
  const url = VUE_APP_basic + '/pc/rest/getWxVerifyCode'
  const param = params
  return  LoginPost(url, param)
}
 //是否是自由职业者和是否已认证判断
 export function isPass (params) {
  const url = VUE_APP_export + '/public/rest/isPass'
  const param = params
  return  AxiosPost(url, param)
}
//退出
export function logout (params) {
  const url = VUE_APP_basic + '/pc/rest/logout'
  const param = params
  return  AxiosPost(url, param)
}
//e签宝
export function list (params) {
  const url = VUE_APP_export + '/public/rest/list'
  const param = params
  return  AxiosPost(url, param)
}
//签署
export function getSignUrl (params) {
  const url = VUE_APP_export + '/public/rest/getSignUrl'
  const param = params
  return  AxiosPost(url, param)
}
//自由职业者认证
export function freelanceCertification (params) {
  const url = VUE_APP_export + '/public/rest/freelanceCertification'
  const param = params
  return  AxiosPost(url, param)
}
//获取公共字典自由职业者认证
export function getDictItemsByCodes (params) {
  const url = VUE_APP_basic + '/pcdict/rest/getDictItemsByCodes'
  const param = params
  return  AxiosPost(url, param)
}
//实名认证
export function certification (params) {
  const url = VUE_APP_export + '/public/rest/certification'
  const param = params
  return  AxiosPost(url, param)
}
//验证码二次认证
export function messageCertification (params) {
  const url = VUE_APP_export + '/public/rest/messageCertification'
  const param = params
  return  AxiosPost(url, param)
}
//实名认证 身份证识别
export function idBaiDuOcr (params) {
  const url = VUE_APP_export + '/public/rest/idBaiDuOcr'
  const param = params
  return  AxiosPost(url, param)
}
//实名认证 银行卡识别
export function bankOcr (params) {
  const url = VUE_APP_export + '/public/rest/bankOcr'
  const param = params
  return  AxiosPost(url, param)
}
//个性化配置
export function getByOrgAndCompanyId (params) {
  const url = VUE_APP_export + '/orgDiv/rest/getByOrgAndCompanyId'
  const param = params
  return  AxiosPost(url, param)
}

