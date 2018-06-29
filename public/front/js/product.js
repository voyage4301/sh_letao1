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

  renderSecond()

  // 2.导航点击事件
  $('#secondNav').on('click', 'a', function () {
    $(this).parent().addClass('current').siblings().removeClass('current')
    console.log($(this).data('id'));
  })
})