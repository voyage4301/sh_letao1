$(function () {

  ; //用户信息
  (function () {
    var current = 1, //当前页
      pageSize = 10, //每页数据条数
      id = 0, //被点击的信息id
      isDelete = 0 //被点击的信息状态

    //1.渲染用户数据
    function render() {
      $.ajax({
        type: 'get',
        url: '/user/queryUser',
        data: {
          page: current,
          pageSize: pageSize
        },
        dataType: 'json',
        success: function (info) {
          //渲染模板
          $('#userTable tbody').html(template('userList', info))
          //分页
          $('#paginator').bootstrapPaginator({
            bootstrapMajorVersion: 3,
            currentPage: info.page,
            totalPages: Math.ceil(info.total / info.size),
            size: 'small',
            onPageClicked: function (a, a, a, page) {
              current = page
              render()
            }
          })
        }
      })
    }
    render()

    //2.用户状态编辑
    $('#userTable').on('click', '.btn', function () {
      $('#userManageModal').modal('show')
      id = $(this).parent().data('id')
      isDelete = $(this).parent().data('isdel') === 1 ? 0 : 1
    })

    //3.模态框确认按钮
    $('#affirm_btn').on('click', function () {
      $.ajax({
        type: 'post',
        url: '/user/updateUser',
        data: {
          id: id,
          isDelete: isDelete
        },
        dataType: 'json',
        success: function (info) {
          if (info.success) {
            $('#userManageModal').modal('hide')
            render()
          }
        }
      })
    })

  })();
})