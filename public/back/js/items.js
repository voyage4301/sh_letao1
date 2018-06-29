$(function () {
    var current = 1,
        pageSize = 5,
        picArr = [],
        picStr = ''

    //1.渲染商品信息
    function render() {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: current,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                //1.1渲染数据
                $('#itemsTable tbody').html(template('itemsList', info))
                //1.2分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total / info.size),
                    size: 'small',
                    useBootstrapTooltip: true,
                    itemTexts: function (type, page, current) {
                        switch (type) {
                            case 'page':
                                return page
                            case 'next':
                                return '下一页'
                            case 'last':
                                return '尾页'
                            case 'prev':
                                return '上一页'
                            case 'first':
                                return '首页'
                        }
                    },
                    tooltipTitles: function (type, page, current) {
                        switch (type) {
                            case 'page':
                                return '前往第' + page + '页'
                            case 'next':
                                return '前往下一页'
                            case 'last':
                                return '前往尾页'
                            case 'prev':
                                return '前往上一页'
                            case 'page':
                                return '前往首页'
                        }
                    },
                    onPageClicked: function (a, a, a, page) {
                        current = page
                        render()
                    }
                })
            }
        })
    }
    render()

    //2.添加商品按钮点击事件
    $('#addItemBtn').on('click', function () {
        $('#addItemModal').modal('show')
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: 'json',
            success: function (info) {
                $('#selectSecond').html(template('secondList', info))
            }
        })
    })
    //3.下拉选项点击事件,改变target选项,存储target的id
    $('#selectSecond').on('click', 'a', function () {
        $('.dropdownTitle').text($(this).text())
        $('#brandId').val($(this).data('id'))
        $('#form').data('bootstrapValidator').updateStatus('brandId', 'VALID')
    })

    //4.图片上传功能
    //4.1图片回显&&记录图片信息
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            var picAddr = data.result.picAddr, //一次性获取图片的地址和名字,减少资源消耗
                picName = data.result.picName
            $('#showPic').append('<img src="' + picAddr + '" height="100" alt="加载失败">') //动态回显图片
            picArr.push({ //数组存储地址和图片名
                picAddr: picAddr,
                picName: picName
            })
            var imgsCount = picArr.length //一次性获取图片数量,减少资源消耗
            if (imgsCount > 3) {
                $('#showPic').find('img:nth-of-type(-n+' + (imgsCount - 3) + ')').remove() //删除多余的图片
                picArr.shift() && (imgsCount = 3)
            }
            if (imgsCount === 3) {
                picArr.forEach(function (v, i) { //将图片信息拼接为字符串
                    picStr += '&picName' + (i + 1) + '=' + v.picName + '&picAddr' + (i + 1) + '=' + v.picAddr
                })
                $('#form').data('bootstrapValidator').updateStatus('itemsPic', 'VALID')
            }
        }
    })

    //4.2表单验证
    $('#form').bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请选择二级分类名称!'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '商品名称不能为空!'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '商品描述不能为空!'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '商品数量不能为空!'
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '商品库存必须是非零开头的数字'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '商品尺寸不能为空!'
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '商品尺码必须是 xx-xx 的格式, 例如 32-40'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '商品原价不能为空!'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '商品价格不能为空!'
                    }
                }
            },
            itemsPic: {
                validators: {
                    notEmpty: {
                        message: '请上传3张商品的图片!'
                    }
                }
            }
        }
    })

    //4.3表单提交
    $('#form').on('success.form.bv', function (e) {
        e.preventDefault()
        var data = $(this).serialize() + picStr

        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            data: data,
            dataType: 'json',
            success: function (info) {
                if (info.success) {
                    $('#addItemModal').modal('hide') //1.关闭模态框
                    render() //商品列表重新渲染
                    $('#showPic').find('img').remove() //清空3张回显的图片
                    $('.dropdownTitle').text('请选择二级分类') //复原下拉框的标题
                    $('#form').data('bootstrapValidator').resetForm(true) //重置表单
                }
            }


        })

    })
})