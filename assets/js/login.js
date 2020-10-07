$(function () {
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })


  // 自定义校验规则 获取form对象
  var form = layui.form
  form.verify({
    pwd: [
      /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致！'
      }
    }
  })

  // 发起注册用户的Ajax请求
  var layer = layui.layer
  // 注册功能
  $('#form_reg').on('submit', function (e) {
    // 阻止默认提交行为
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/reguser',
      data: {
        username: $('.reg-box [name=username]').val(),
        password: $('.reg-box [name=password]').val()
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功！请登录!')
        // 手动切换回登录界面
        $('#link_login').click()
        // 重置form表单
        $('#form_reg')[0].reset()
      }
    })
  })
  //登录功能
  $('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        // 校验状态
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        // 成功就提示信息保存token，然后跳转页面
        layer.msg('恭喜您，登陆成功！')
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
      }
    })
  })
})