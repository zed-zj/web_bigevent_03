
var baseURL = 'http://ajax.frontend.itheima.net'

$.ajaxPrefilter(function (options) {
  options.url = baseURL + options.url

  // 统一为有权限的接口，设置 headers 请求头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }
  // 全局统一挂载 complete 回调函数
  options.complete = function (res) {
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      // 清空token，跳转页面
      localStorage.removeItem('token')
      location.href = '/login.html'
    }
  }



})