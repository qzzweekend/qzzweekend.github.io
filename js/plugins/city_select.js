/**
 *@城市列表选择组件
 * Created by qzz on 2016/11/11.
 */

function CityList(){
    if(!arguments.length){
        return;
    }

    if(jQuery){
        this.init.apply(this,arguments);
    }else{
        alert('需要jQuery');
    }
}

CityList.prototype={
    constructor:CityList,
    init:function(options){
        this.id=options.id;
        this.createPanel();
        this.inputEvent(options.id);
    },

    createPanel:function(){
        var cityContent=[
            '<div class="week_mask"></div>'+
            '<div class="city_select_pop">'+
            '<div class="city_pop_head">'+
            '<span class="city_cancel">取消</span>'+
            '<h3>选择城市</h3>'+
            '</div>'+
            '<div class="city_pop_content">'+
            '<div class="city_left_wrap">'+
            '<ul class="city_left_ul">'+
            '<li class="city_left_item active">上海</li>'+
            '<li class="city_left_item">北京</li>'+
            '<li class="city_left_item">天津</li>'+
            '<li class="city_left_item">河北</li>'+
            '<li class="city_left_item">山西</li>'+
            '<li class="city_left_item">内蒙古</li>'+
            '<li class="city_left_item">四川</li>'+
            '<li class="city_left_item">海南</li>'+
            '</ul>'+
            '</div>'+
            '<div class="city_pop_right_wrap">'+
            '<ul class="city_pop_right_ul">'+
            '<li class="city_right_item">全上海</li>'+
            '<li class="city_right_item">黄浦区</li>'+
            '<li class="city_right_item">卢湾区</li>'+
            '<li class="city_right_item">徐汇区</li>'+
            '<li class="city_right_item">长宁区</li>'+
            '<li class="city_right_item">静安区</li>'+
            '<li class="city_right_item">黄浦区</li>'+
            '<li class="city_right_item">卢湾区</li>'+
            '<li class="city_right_item">徐汇区</li>'+
            '<li class="city_right_item">长宁区</li>'+
            '<li class="city_right_item">静安区</li>'+
            '</ul>'+
            '</div>'+
            '</div>'+
            '</div>'
        ].join('');

        var city_wrap=$('<div></div>');
        city_wrap.html(cityContent).appendTo($(document.body));

    },

    inputEvent:function(id){
        var that=this;
        $(id).on('click', function () {
            var that=$(this).find('#city_content');
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

            $('.week_mask').click(function(){
                $(this).fadeOut(100);
                $('.city_select_pop').animate({
                    bottom: '-10rem'
                }, 200);
            });

            //城市区点击时
            $('.city_pop_content').click(function (e) {
                var target = $(e.target);
                if (target.hasClass('city_left_item') ) {
                    $('.city_left_ul >li').removeClass('active');
                    target.addClass('active');
                }else if(target.hasClass('city_right_item')){
                    var cityName=$('.city_left_ul >li.active').html()+'&nbsp;&nbsp;'+target.html();
                    that.html('<i class="city_text">'+cityName+'</i>');
                    $('.week_mask').fadeOut(100);
                    $('.city_select_pop').animate({
                        bottom: '-10rem'
                    }, 200);
                }
            });

        });
    }

}
