$(function () {
  var current = 1,
    pageSize = 4

  //1.渲染二级分类信息
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: current,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        $('#second-table tbody').html(template('secondList', info))
        // 分页
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

  //2.添加
  //2.1点击添加分类按钮弹出模态框
  $('#addSecond').on('click', function () {
    $('#addSecondModal').modal('show')
  })

  //2.2点击添加分类按钮,下拉框动态生成一级列表数据
  $('#addSecond').on('click', function () {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function (info) {
        $('.dropdown-menu').html(template('firstList', info))

        //2.3对每一个下拉选项设置点击事件
        $('.dropdown-menu li a').each(function () {
          $(this).on('click', function () {
            $('.selectName').text($(this).text()) //更改名称
            $('.categoryId').val($(this).data('id')) //存储一级类别的id
            $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID')
          })
        })
      }
    })
  })

  //2.4图片添加
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function (e, data) {
      $('#addImg').attr('src', data.result.picAddr)
      $('.brandLogo').val(data.result.picAddr)
      $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID')
    }
  })

  //2.5表单校验
  $('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请您上传图片'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '请输入二级分类名称'
          }
        }
      }
    }
  })

  //2.6添加功能
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault()

    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      data: $(this).serialize(),
      dataType: 'json',
      success: function (info) {
        if (info.success) {
          $('#addSecondModal').modal('hide')
          $('.selectName').text('请选择一级分类')
          $('#addImg').attr('src', './images/default.png')
          $('#form').data('bootstrapValidator').resetForm(true)
          render()

        }
      }
    })

  })


})