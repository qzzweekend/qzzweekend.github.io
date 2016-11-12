/*
 * @vlm.js
 * @name:Format Validation
 * auth:qizhenzhen
 * 2016-11-12
 * ver:1.0
 */
(function (e, t) {
    var n = n || (function (n) {
            //var _api = location.protocol + "//10.7.2.119/api/GetServiceApiResult", //协议+地址
            _Utils = {

                //格式验证
                validate: {
                    //手机格式
                    mobileNo: function (mobile) {
                        var pattern = /^1[34578]\d{9}$/;
                        if (pattern.test(mobile)) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    //邮箱
                    email: function (email) {
                        var pattern = /^(\w-*_*\.*)+@(\w-?)+(\.\w{2,})+$/;
                        if (pattern.test(email)) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    //六位数字验证码
                    code: function (name) {
                        var pattern = /^[0-9]{6}$/;
                        //只能是中文，长度为2-7位
                        if (pattern.test(name)) {
                            return true;
                        } else {
                            return false;
                        }
                    },

                    //替换
                    replaceNum: function (obj) {
                        obj.value = obj.value.replace(/\D/ig, '');
                    }

                },

                //时间倒数
                timeCountDown: function (seconds, cb1, cb2) {
                    var timer = setInterval(function () {
                        seconds--;
                        if (seconds == 0) {
                            clearInterval(timer);
                            cb2();
                        } else {
                            cb1(seconds);
                        }
                    }, 1000);
                    return timer;
                },

                trim: function (str) {
                    return str.replace(/(^\s*)|(\s*$)/g, "");
                },

                //提示信息toast
                toast:function toast(str) {
                    var timer = null;
                    var toast = $('<div id="week_toast">' + str + '</div>');
                    toast.appendTo($(document.body));
                    toast.animate({
                        opacity: 1
                    }, 200, 'linear', function () {
                        clearTimeout(timer);
                        timer = setTimeout(function () {
                            toast.animate({
                                opacity: 0
                            }, 400, function () {
                                toast.remove();
                            });
                        }, 1500)
                    });
                },

                //验证手机验证码
                vlidateMobileCode: function (paramsObj) {
                    var data;
                    $.ajax({
                        type: 'get',
                        async: false,
                        url: _api + '/validate/check_mcode1',
                        dataType: 'json',
                        data: paramsObj,
                        success: function (jsondata) {
                            data = jsondata;
                        }
                    });
                    return data;
                },
                //发送手机验证码
                sendMobileCode: function (paramsObj) {
                    var data;
                    $.ajax({
                        type: 'get',
                        async: false,
                        url: _api + '/validate/send_mcode1',
                        dataType: 'json',
                        data: paramsObj,
                        success: function (jsondata) {
                            data = jsondata;
                        }
                    });
                    return data;
                }

            };
            //out api
            return {
                Utils: _Utils
            };
        })();
    if (typeof module !== "undefined" && module.exports) {
        module.exports = n;
    }
    if (typeof ender === "undefined") {
        this.vlm = n;
    }
    if (typeof define === "function" && define.amd) {
        define("vlm", ['jquery'], function ($) {
            return n;
        });
    }
}).call(this, window, document);