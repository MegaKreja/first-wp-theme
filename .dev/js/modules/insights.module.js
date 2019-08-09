var insightsModule = (function($){
    var $popup = $('.insights-popup'),
    $popupClose = $('.popup-close'),
    $popupTitle = $('.insights-popup-title'),
    $postWrap = $('.insights-posts'),
    $categories = $('.insights-categories'),
    $actionCard = $('.action-card--insight'),
    $page = $('html'),
    $activeInsightSlider = undefined,
    popupOpen = false,
    activeType = undefined,
    isHovering = false,

    // display sleected type insights in the popup
    loadTypeData = function(typeId){
        activeType = typeId;
        $('.insights-type.active').removeClass('active');
        $('.insights-type[data-type="'+typeId+'"]').addClass('active');
    },

    resizePopup = function(){
        var catsW = $categories.outerWidth();
        var winW = $(window).width();
        var catOffset = $categories.offset();
        $popup.addClass('active').css('width', winW  - catOffset.left - catsW );
    },

    //display the insights popup
    showPopup = function(){
        popupOpen = true;
        resizePopup();
        titleSpacing();
        lockPageScroll();
    },

    closePopup = function(){
        popupOpen = false;
        activeType = undefined;
        $popup.removeClass('active');
        $actionCard.removeClass('active');
        lockPageScroll();
    },

    loadPopupTitle = function( title, description ){
        $popupTitle.find('h2').text(title);
        $popupTitle.find('span').text(description);
    },

    titleSpacing = function() {
        var topSpacing = $popupTitle.outerHeight() + $popupClose.outerHeight();
        $postWrap.css({ height: 'calc(100% - ' + topSpacing + 'px)' });
    },

    lockPageScroll = function() {
        helperModule.media('screen and (max-width: 991px)', function() {
            if (popupOpen) {
                $page.addClass('war-lock-scroll'); // when the popup is open and the screen size is bellow the mobile breakpoint -> add class for page scroll lock
            } else if (popupOpen == false && $('.war-lock-scroll').length) { 
                $page.removeClass('war-lock-scroll'); // when the popup is closed and the page has the class for page scroll lock -> remove that class
            }
        });
        helperModule.media('screen and (min-width: 992px)', function() {
            if($('.war-lock-scroll').length) {
                $page.removeClass('war-lock-scroll'); // when the screen size is above mobile and the page has the class for page scroll lock -> remove that class
            }
        });
    },

    buildInsightsMarkup = function(typeId){
        $postWrap.html("");
        var html = "";
        html+= "<div class='insights-type' data-type='"+typeId+"'>";
        if(insightsData){
            $.each( helperModule.chunk(insightsData.types[typeId].insights, 4), function( index, slide ) {
                html+= "<div class='insights-slide py-3 py-md-5 px-4'>";
                $.each( slide, function( index, insight ) {
                    var link = insight.url && insight.url!=""  ? insight.url : insight.pdf.url;
                    html+= "<div class='insight'>";
                    html+= "<a href='"+link+"' target='_blank'>";
                    html+= "<h2>"+insight.title+"</h2>";
                    html+= "<span>Read more</span>";
                    html+= "</a>";
                    html+= "</div>";
                });
                html+= "</div>";
            });
        }
        html+= "</div>";
        $postWrap.html(html);
        
    },

    // init selected insights slider
    initInsightSlider = function(){
        var $sliderElementRef = $('.insights-type[data-type="'+activeType+'"]');
        // destroy any active insights sliders
        if( $activeInsightSlider  &&  $activeInsightSlider.slick){
            $activeInsightSlider.slick('unslick');
        }

    
       setTimeout(function(){
        $activeInsightSlider = $sliderElementRef.slick({
            infinite: false,
            slidesToShow: 1,
            arrows: true,
            prevArrow: $('.insights-list_slider-prev'),
            nextArrow: $('.insights-list_slider-next'),
            autoplay: false,
            fade: false,
            speed: 200,
            pauseOnHover: false
        });
       },100);
    };

    
    $actionCard.click(function(){
        $actionCard.removeClass('active');
        var $button = $(this);
        var typeId = $button.attr('data-type-id');
        buildInsightsMarkup(typeId);
        $button.addClass('active');
        if ( activeType == typeId ) {
            closePopup();
            $actionCard.removeClass('active');
            return false;
        }
        var typeTitle = $button.find('h5').text();
        var typeDescription = $button.find('h6').text();
        loadPopupTitle( typeTitle, typeDescription );

        activeType = typeId;
        loadTypeData(typeId);
        initInsightSlider();
        showPopup();
    });

    // $actionCard.hover(
    //     function() {
    //         isHovering = true;
    //         $actionCard.removeClass('active');
    //         var $button = $(this);
    //         var typeId = $button.attr('data-type-id');
    //         $button.addClass('active');
    //         if ( activeType == typeId ) {
    //             closePopup();
    //             $actionCard.removeClass('active');
    //             return false;
    //         }
    //         activeType = typeId;
    //         loadTypeData(typeId);
    //         initInsightSlider();
    //         showPopup();
            
    //     }, 
    //     //mouse out callback
    //     function() {
    //         isHovering = false;
    //         setTimeout(function(){
    //             if(!isHovering){
    //                 closePopup();
    //             }
    //         },300);
    //     }
    // );

    // $popup.hover(function(){
    //     isHovering = true;
    // },function() {
    //     isHovering = false;
    //     setTimeout(function(){
    //         if(!isHovering){
    //             closePopup();
    //         }
    //     },300);
    // });


    $popupClose.click(function(){
        closePopup();
    });

    $(window).resize(function() {
        clearTimeout(window.resizedFinished);
        window.resizedFinished = setTimeout(function(){
            if(popupOpen){
                resizePopup();
                setTimeout(function(){
                    initInsightSlider();
                },250);   
            }
        }, 250);
    });

})(jQuery);