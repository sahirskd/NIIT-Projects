
var _jscale_point = 1;

var _jscale_width = 1;

var _jscale_height = 1;

var _jfind_wh_timeout;


var _jleft_margin = 0;
var _jtop_margin = 0;

var _jios = (navigator.userAgent.indexOf("AppleWebKit/") > -1 && navigator.userAgent.indexOf("Mobile/") > -1);
var _jandroid = (navigator.userAgent.indexOf("Android") > -1);


function scaleToFit() {    
    let containerSelector = '#shellContainer';
    // trace("find WH")
    _jscale_point = 1;

    _jleft_margin = 0;
    _jtop_margin = 0;

// Code start //
    _jbrowser_width = $(window).width();
    _jbrowser_height = $(window).height();
// Code end //
    _jcourse_width = $(containerSelector).width();
    _jcourse_height = $(containerSelector).height();

    _jscale_width = _jbrowser_width / _jcourse_width;

    _jscale_height = _jbrowser_height / _jcourse_height;

    if (_jscale_width < _jscale_height) {
        _jscale_height = _jscale_width;
    } else {
        _jscale_width = _jscale_height;
    }

    if (_jscale_width > 1) {
        _jscale_width = _jscale_height = 1;
    }
    _jscale_point = _jscale_width;

    $(containerSelector).css('-webkit-transform', 'scale(' + _jscale_point + ', ' + _jscale_point + ')');
    $(containerSelector).css('transform', 'scale(' + _jscale_point + ', ' + _jscale_point + ')');
    $(containerSelector).css('transform-origin', '0 0');

    $(containerSelector).css('box-sizing', 'border-box');

    var winWidth = $(window).width();
    var docWidth = ($(containerSelector).width() * _jscale_point);

    var winHeight = $(window).height();
    var docHeight = ($(containerSelector).height() * _jscale_point);

    if (winWidth > docWidth) {
        _jleft_margin = (winWidth - docWidth) / 2;
    }

    if (winHeight > docHeight) {
        _jtop_margin = (winHeight - docHeight) / 2;
    }

    if (_jbrowser_width>550) {
        
        $(containerSelector).css("margin-left", _jleft_margin + "px");
    }else{

        $(containerSelector).css("margin-left", 0 + "px");
    }
    
    $(containerSelector).css("margin-top", _jtop_margin + "px");
    // $(containerSelector).css("width", _jbrowser_width + "px");



  


}
