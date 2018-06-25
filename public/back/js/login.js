$(function () {

  ; //表单验证
  (function () {
    $('#form').bootstrapValidator({
      fields: {
        username: {
          validators: {
            notEmpty: {
              message: '用户名不能为空!'
            },
            stringLength: {
              min: 2,
              max: 6,
              message: '用户名长度为2-6位!'
            }
          }
        },
        password: {
          validators: {
            notEmpty: {
              message: '密码不能为空!'
            },
            stringLength: {
              min: 6,
              max: 12,
              message: '密码长度为6-12位!'
            }
          }
        }
      }
    })
  })();

  ; //登录后台验证
  (function () {
    $("[type='submit']").on('click', function (e) {
      e.preventDefault()
      $.ajax({
        type: 'post',
        url: '/employee/employeeLogin',
        data: '',
        dataType: '',
        success: function (info) {
          console.log('登录成功');
          
        }
      })
    })
  })();

})