/*
 * @vlm.js
 * @name:Format Validation
 * auth:qizhenzhen
 * 2016-11-12
 * ver:1.0
 */
(function (e, t) {
    var n = n || (function (n) {
            //var _api = location.protocol + "//10.7.2.119/api/GetServiceApiResult", //Э��+��ַ
            _Utils = {

                //��ʽ��֤
                validate: {
                    //�ֻ���ʽ
                    mobileNo: function (mobile) {
                        var pattern = /^1[34578]\d{9}$/;
                        if (pattern.test(mobile)) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    //����
                    email: function (email) {
                        var pattern = /^(\w-*_*\.*)+@(\w-?)+(\.\w{2,})+$/;
                        if (pattern.test(email)) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    //��λ������֤��
                    code: function (name) {
                        var pattern = /^[0-9]{6}$/;
                        //ֻ�������ģ�����Ϊ2-7λ
                        if (pattern.test(name)) {
                            return true;
                        } else {
                            return false;
                        }
                    },

                    //�滻
                    replaceNum: function (obj) {
                        obj.value = obj.value.replace(/\D/ig, '');
                    }

                },

                //ʱ�䵹��
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

                //��ʾ��Ϣtoast
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

                //��֤�ֻ���֤��
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
                //�����ֻ���֤��
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