$(function () {
  // 获取用户信息
  getUserInfo()
  // 点击按钮实现退出功能
  var layer = layui.layer
  $('#btnLogout').on('click', function () {
    // 有提示的询问框
    layer.confirm('是否确认退出登录?', { icon: 3, title: '提示' }, function (index) {
      // 清空token，跳转页面
      localStorage.removeItem('token')
      location.href = '/login.html'
      layer.close(index);
    });
  })

})
function getUserInfo() {
  $.ajax({
    url: '/my/userinfo',
    // headers: {
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg(res.message)
      }
      // 成功就渲染
      renderAvatar(res.data)
    },
    // 无论成功与否都会调用complete回调函数
    // complete: function (res) {
    //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //     // 清空token，跳转页面
    //     localStorage.removeItem('token')
    //     location.href = '/login.html'
    //   }
    // }
  })
}
function renderAvatar(user) {
  // 获取用户名称
  var name = user.nickname || user.username
  // 渲染用户名
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  if (user.user_pic !== null) {
    // 有头像
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.user-avatat').hide()
  } else {
    // 没有头像
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.user-avatat').show().html(first)
  }
}