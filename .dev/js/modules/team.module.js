var headerModule = (function($){

    var $teamSection = $('.team'),
    $teamSliderWrap = $('.team-list_slider-wrap'),
    $teamShowcaseClose = $('.team-showcase-close'),
    $teamSingleShowcase = $('.team-showcase'),
    teamShowcaseOpen = false,
    teamSliderActive = false,
    isLargeScreen = false,
    teamSlickSlider = undefined,
    updateClasses = function($event) {
        if ($event == 'slider-activated') {
            $teamSection.addClass('team-slider--active');
            $teamSection.removeClass('team-slider--inactive');
        } else if ($event == 'slider-destroyed') {
            $teamSection.addClass('team-slider--inactive');
            $teamSection.removeClass('team-slider--active');
        } else if ($event == 'showcase-open') {
            $teamSection.addClass('team-showcase--active');
            $teamSection.removeClass('team-showcase--inactive');
        } else if ($event == 'showcase-closed') {
            $teamSection.addClass('team-showcase--inactive');
            $teamSection.removeClass('team-showcase--active');
        }
    },
    closeShowcase = function() {
        if (teamShowcaseOpen) {
            updateClasses('showcase-closed');
            teamShowcaseOpen = false;
            closeCurrentShowcase();
        }
    },
    closeCurrentShowcase = function() {
        // if a new .action-card is clicked, remove the .active class from the old one and hide the old .team-showcase
        $('.team-list_wrap .action-card--team').removeClass('active');
        $teamSingleShowcase.hide();
    },
    openShowcase = function($targetRef) {
        // if showcase was closed, update parameters
        if (teamShowcaseOpen == false) {
            updateClasses('showcase-open');
            teamShowcaseOpen = true;
        } else {
            // if a new .action-card is clicked, remove the .active class from the old one and hide the old .team-showcase
            closeCurrentShowcase();
        }

        // add the newly clicked .action-card an .active class
        $targetRef.addClass('active');

        // get the showcase target ID of the newly clicked .action-card
        var showcaseID = $targetRef.attr("data-id");
        // and display it
        $('.team-showcase[data-target="'+ showcaseID +'"]').css('display', 'flex');
    },
    initListSlider = function($targetRef){
        // init slider and related code only when the screen is big enough and the slider isn't already initialized
        if (isLargeScreen && !teamSliderActive) {
            // get index of the clicked .action-card parent list element
            var $parent = $targetRef.closest(".team-list");

            // init slick slide
            teamSlickSlider = $('.team-list_slider-wrap').slick({
                infinite: false,
                slidesToShow: 1,
                prevArrow: $('.team-list_slider-prev'),
                nextArrow: $('.team-list_slider-next'),
                arrows: true,
                autoplay: false,
                fade: false,
                speed: 200,
                initialSlide: $parent.index()
            });
        }
    },
    destroySlickSlider = function() {
        if (teamSliderActive) {
            teamSlickSlider.slick('unslick');
        }
    },
    bindActionCardClick = function() {
        // on .action-card click
        $('.team-list_wrap .action-card--team').on('click', function () {

            // get the clicked .action-card
            $activeActionCard = $(this);

            // stop .action-card selection function if that .action-card is already selected/active
            if ($activeActionCard.hasClass('active')) {
                return;
            }
            
            // run slider activation function, if/else logic is inside the function
            initListSlider($activeActionCard);

            // run functions that opens/changes Showcase
            openShowcase($activeActionCard);
        })
    },
    
    // actual function for the team section
    teamSelection = function(){

        // hide team content on page load (note: it's already hidden through css, but just in case)
        $teamSingleShowcase.hide();

        // on .action-card click
        bindActionCardClick();

    };

    // Bindes action on slick slider INIT event
    $teamSliderWrap.on('init', function(event, slick){

        teamSliderActive = true;
        // after slick slider init event update classes
        updateClasses('slider-activated');

    });

    // Bind action on slick slider DESTROY event
    $teamSliderWrap.on('destroy', function(event, slick){

        teamSliderActive = false;
        // after slick slider destroy event update classes
        updateClasses('slider-destroyed');
        bindActionCardClick();

    });

    // actions on window min-width: 1440px breakpoint
    helperModule.media('screen and (min-width: 1440px)', function(){
        isLargeScreen = true;
        closeShowcase();
    });

    // actions on window max-width: 1439px breakpoint
    helperModule.media('screen and (max-width: 1439px)', function(){
        isLargeScreen = false;
        destroySlickSlider();
        closeShowcase();
    });

    // showcase close button function
    $teamShowcaseClose.click(function() {
        closeShowcase();
    })

    // if there's a Team section on the page, run teamSelection() function
    if ($teamSection.length) {
        teamSelection();
    } 
	
})(jQuery);