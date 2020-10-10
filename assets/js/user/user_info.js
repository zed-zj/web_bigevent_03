$(function () {
  var form = layui.form
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度必须在 1 ~ 6 个字符之间！'
      }
    }
  })


  // 获取用户的基本信息
  initUserInfo()
  // 初始化用户的基本信息
  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败！')
        }
        form.val('formUserInfo', res.data)
      }
    })
  }

  //表单重置
  $("#btnReset").on('click', function (e) {
    e.preventDefault()
    // 重新渲染
    initUserInfo()
  })

  // 修改用户信息
  $(".layui-form").on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('恭喜您，修改信息成功')
        // 调用父页面的方法
        window.parent.getUserInfo()
      }
    })
  })
})