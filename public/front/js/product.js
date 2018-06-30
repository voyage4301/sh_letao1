$(function () {
  // 1.动态渲染二级分类
  function renderSecond() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategory',
      dataType: 'json',
      success: function (info) {
        $('#secondNav').html(template('navList', info))
        $('#secondNav li').eq(0).addClass('current')
      }
    })
  }

  renderSecond() //初始渲染

  // 2.1导航点击事件()
  $('#secondNav').on('click', 'a', function () {
    $(this).parent().addClass('current').siblings().removeClass('current')
    renderItems($(this).data('id'))
  })

  //2.2渲染二级分类下的商品
  function renderItems(id) {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategory',
      data: {
        id: id || 1
      },
      dataType: 'json',
      success: function (info) {
        $('#itemsList').html(template('itemsTmp', info))
      }
    })
  }
  renderItems() //初始渲染
})