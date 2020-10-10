$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  // 选择文件
  $('#btnChooseImage').on('click', function () {
    $('#file').click()
  })

  // 修改裁剪图片
  var layer = layui.layer
  $('#file').on('change', function (e) {
    //获取用户选择的文件
    var files = e.target.files
    // 非空校验
    if (files.length == 0) {
      return layer.msg('请选择图片！')
    }
    // 根据选择的文件创建应该对应的url地址
    // 1. 拿到用户选择的文件
    var file = e.target.files[0]
    // 2. 将文件，转化为路径
    var imgURL = URL.createObjectURL(file)
    // 3. 重新初始化裁剪区域
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', imgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })

  // 上传头像
  $('#btnUpload').on('click', function () {
    // 创建一个 Canvas 画布，将 Canvas 画布上的内容，转化为 base64 格式的字符串
    var dataURL = $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png') //转化为 base64 格式的字符串

    $.ajax({
      method: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('恭喜你，更新头像成功')
        // 调用父页面的方法渲染顶部头像
        window.parent.getUserInfo()
      }
    })
  })
  getUserInfo()
  // 修改个人中心头像
  function getUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message)
        }
        // 渲染 头像
        $image
          .cropper('destroy') // 销毁旧的裁剪区域
          .attr('src', res.data.user_pic) // 重新设置图片路径
          .cropper(options) // 重新初始化裁剪区域
      }
    })
  }





})