var preloaderModule = (function($){
    var $html = $('html'),
    doOnPageLoaded = function(){
        $html.removeClass('war-loading');
    };

    $(window).load(function(){
        doOnPageLoaded();
    });
})(jQuery);