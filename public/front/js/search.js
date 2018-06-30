$(function () {

  var arr = ['1', '11', '三叶草', '新秀丽', '陈珂']
  // 1.添加数据到本地存储
  function addDemo(arr) { //测试用数据
    dataStr = JSON.stringify(arr)
    localStorage.setItem('value', dataStr)
  }
  // addDemo(arr) //测试用数据


  // 2.获取本地存储的数据
  function getHistory() {
    var infoStr = localStorage.getItem('value') || '[]'
    var info = JSON.parse(infoStr)
    return info
  }

  // 3.渲染到页面
  function render() {
    $('.history_content').html(template('historyList', {
      rows: getHistory()
    }))
  }
  render()

  // 4.删除历史记录
  $('.history_content').on('click', '.del', function () {
    var $index = $(this).data('index') //获取索引
    var info = getHistory() //获取本地数据的数组
    info.splice($index, 1) //删除
    addDemo(info) //存储到本地
    render() //重新渲染页面
  })

  //5.搜索按钮点击事件
  $('.search_btn').on('click', function () {
    var text = $('#search_input').val().trim()
    if (text === '') { // 搜索内容为空时: 提示和跳出事件
      mui.toast('调皮! o(*￣︶￣*)o')
      return
    }
    // 1.先判断原搜索历史中是否有本次搜索的内容
    var info = getHistory()
    var flagIndex = info.indexOf(text)
    flagIndex !== -1 && info.splice(flagIndex, 1) //只要不等于-1,说明已经存在,需要删除
    info.unshift(text) //把新搜索的历史记录放到第一
    info.length > 10 && info.pop() //限制搜索历史的条数
    addDemo(info) //存储到本地
    render() //重新渲染页面
    $('#search_input').val('') //重置搜索框
    location.href = './searchList.html?key=' + text
  })

  //6.清空历史记录
  $('.delAll').on('click', function () {
    mui.confirm('你确定要清空所有历史记录吗?', '温馨提示', ['取消', '确认'], function (e) {
      if (e.index === 1) {
        localStorage.removeItem('value')
        render()
      }
    })
  })
})