$(function () {

  var current = 1, //当前页
    pageSize = 2 //每页的数据条数

  // 1.渲染一级列表信息
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: current,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        $('#first-table tbody').html(template('firstList', info))

        $('.pagination').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          curentPage: info.page,
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

  // 2.添加分类
  // 2.1弹出模态框
  $('#addFirst').on('click', function () {
    $('#addFirstModal').modal('show')
  })
  // 2.2添加
  $('#addFirst_btn').on('click', function () {
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: {
        categoryName: $("[type='text']").val()
      },
      dataType: 'json',
      success: function (info) {
        if (info.success) {
          $('#addFirstModal').modal('hide')
          render()
        }
      }
    })
  })
})