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
    //1.页面拦截
    (location.href.indexOf('login.html') === -1) && $.ajax({
      type: 'get',
      url: '/employee/checkRootLogin',
      dataType: 'json',
      success: function (info) {
        console.log(info);
        (info.error === 400) && (location.href = './login.html')
      }
    })


  })();

})