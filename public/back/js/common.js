$(function () {

  ; //全局进度条事件
  (function () {
    $(document).ajaxStart(function () {
      NProgress.start()
    })
    $(document).ajaxStop(function () {
      setTimeout(() => {
        NProgress.done()
      }, 500);
    })
  })();

  ; //全局功能
  (function () {
    //1.未登录拦截
    (location.href.indexOf('login.html') === -1) && $.ajax({
      type: 'get',
      url: '/employee/checkRootLogin',
      dataType: 'json',
      success: function (info) {
        (info.error === 400) && (location.href = './login.html')
      }
    })

    //2.二级菜单显示隐藏
    $('#second_btn').on('click', function () {
      $('.second_nav').slideToggle()
    })

    //3.切换侧边栏显示
    $('#aside_btn').on('click', function () {
      $('.lt_aside').toggleClass('isOrHide')
      $('.lt_main').toggleClass('isOrHide')
    })

    //4.退出按钮
    $('#loginOut').on('click', function () {
      $('#loginOutModal').modal('show')
    })

    //5.模态框退出功能
    $('#loginOut_btn').on('click', function () {
      $.ajax({
        type: 'get',
        url: '/employee/employeeLogout',
        dataType: 'json',
        success: function (info) {
          info.success && (location.href = './login.html')
        }
      })
    })

  })();

})