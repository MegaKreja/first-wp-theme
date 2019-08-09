var awardsModule = (function($){
    var $awards = $('.awards'),
    $sliderWrap = $('.awards-slider'),
    $awardsSlider = undefined,
    isLargeScreen = false,
    initAwardsSlider = function(){
        $awardsSlider = $sliderWrap.slick({
              infinite: false,
              slidesToShow: 2,
              arrows: true,
              prevArrow: $('.awards_slider-prev'),
              nextArrow: $('.awards_slider-next'),
              autoplay: true,
              fade: false,
              speed: 800,
              pauseOnHover: false,
              responsive: [
                {
                  breakpoint: 1439,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                  }
                }
            ]
        });
    },
    buildSliderHtml = function(){
        if(awardsData.length){
            $sliderWrap.html("");
            $.each( awardsData, function( index, value ) {
                var html = "";
                $.each( awardsData[index], function( index, value) {
                    html += "<div class='awards-row'>";
                    html += "<div class='award'>";
                    html += "<h3>"+value.title+"</h3>";
                    html += "<div class='award-description'>"+value.description+"</div>";
                    html += "</div>"; 
                    html += "</div>";
                });
                $sliderWrap.append(html);
            });
        }
    };

    helperModule.media('screen and (min-width: 1440px)', function(){
        isLargeScreen = true;
    });

    helperModule.media('screen and (max-width: 1439px)', function(){
        isLargeScreen = false;
    });

    if($sliderWrap.length){
        buildSliderHtml();
        setTimeout(function(){
            initAwardsSlider();
        },10);
    }else{
        $('.awards-row.inactive').removeClass('inactive');
    }

    // TODO: Move to proper module
    var hash = location.hash.match(/^#?(.*)$/)[1];

    if (hash !== '') {
        var $el = $('#'+ hash);

        if ($el.length) {
            var offset = $el.data('scroll-offset');
            smoothScrollModule.scrollToElement($el, 1000, offset || 100 );
        }
    };

})(jQuery);