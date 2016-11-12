/**
 * @ 城市列表选择组件  citySelect
 * @ author qizhenzhen
 * @ Created by qzz on 2016/11/11.
 */
var provinceItem, cityItem;
function CityList() {
    if (!arguments.length) {
        return;
    }

    if (jQuery) {
        this.init.apply(this, arguments);
    } else {
        alert('需要jQuery');
    }
}

CityList.prototype = {
    constructor: CityList,
    init: function (options) {
        this.id = options.id;
        this.sId = options.sId;
        this.createPanel();
        this.inputEvent(options.id);
    },

    createPanel: function () {
        var provinceContent = [
            '<div class="week_mask"></div>' +
            '<div class="city_select_pop">' +
            '<div class="city_pop_head">' +
            '<span class="city_cancel">取消</span>' +
            '<h3>选择城市</h3>' +
            '</div>' +
            '<div class="city_pop_content">' +
            '<div class="city_left_wrap">' +
            '<ul class="city_left_ul">' +
            '<%for(var i=0;i<cityData_province.length; i++){ %>' +
            '<li class="city_left_item active"><%=cityData_province[i]%></li>' +
            '<% } %>' +
            '</ul>' +
            '</div>' +
            '<div class="city_pop_right_wrap">' +
                //右边城市
            '</div>' +
            '</div>' +
            '</div>'
        ].join('');


        var city_wrap = $('<div></div>');

        //省模板替换
        cityData_province = JSON.parse(localStorage.cityData_province);
        provinceItem = ejs.render(provinceContent, {cityData_province: cityData_province})
        $(provinceItem).appendTo($(document.body));

        //初始化市模板
        this.cityShow();

    },

    cityShow: function (index) {
        index = index || 0;
        var cityContent = [
            '<ul class="city_pop_right_ul">' +
            '<% for(var i=0;i<cityData_city.length; i++){ %>' +
            '<li class="city_right_item"><%=cityData_city[i]%></li>' +
            '<% } %>' +
            '</ul>'
        ].join('');

        //市模板替换
        cityData_city = JSON.parse(localStorage.cityData_city);
        cityItem = ejs.render(cityContent, {cityData_city: cityData_city[index]});
        $('.city_pop_right_wrap').html('');
        $(cityItem).appendTo($('.city_pop_right_wrap'));
    },

    inputEvent: function (id) {
        var that = this;
        $(id).on('click', function () {
            var _this = $(this).find(that.sId);
            $('.week_mask').fadeIn(100);
            $('.city_select_pop').animate({
                bottom: 0
            }, 200);

            //取消
            $('.city_cancel').click(function () {
                $('.week_mask').fadeOut(100);
                $('.city_select_pop').animate({
                    bottom: '-10rem'
                }, 200);
            });

            $('.week_mask').click(function () {
                $(this).fadeOut(100);
                $('.city_select_pop').animate({
                    bottom: '-10rem'
                }, 200);
            });

            //城市区点击时
            $('.city_pop_content').click(function (e) {
                var target = $(e.target);
                if (target.hasClass('city_left_item')) {
                    $('.city_left_ul >li').removeClass('active');
                    target.addClass('active');
                    that.cityShow(target.index());
                } else if (target.hasClass('city_right_item')) {
                    var cityName = $('.city_left_ul >li.active').html() + '&nbsp;&nbsp;' + target.html();
                    _this.html('<i class="city_text">' + cityName + '</i>');
                    $('.week_mask').fadeOut(100);
                    $('.city_select_pop').animate({
                        bottom: '-10rem'
                    }, 200);
                }
            });

        });
    }

}
