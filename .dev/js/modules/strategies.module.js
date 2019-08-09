var strategiesModule = (function($){

  var $strategiesSelect = $('.selector-content'),
      $strategiesPrivate = $('.strategies-private'),
      $strategiesMutual = $('.strategies-mutual'),
      $licenceAgreementPrivate = $('.licence-agreement-private'),
      $licenceAgreementMutual = $('.licence-agreement-mutual'),
      $fundContainer = $('.strategies-bottom'),
      // START: Data display controls;
      $strategiesSliderRange = $('#strategies-slider-range'),
      $fundsSlider = $('.war-funds-slider'),
      $fundsSliderObject = undefined,
      $fundButton = $('.war-fund-button'),
      $fundCategory = $('.war-fund-category'),
      slideBackwards = false;
      // END: Data display controls;
      // START: Data display holders;
      $fundName = $('.war-fund-name'),
      $fundPhilosophy = $('.war-fund-philosophy'),
      $fundHighlights = $('.war-fund-highlights'),
      $fundWhyUseThisFundTitle = $('.war-fund-why-use-this-fund-title'),
      $fundWhyUseThisFund = $('.war-fund-why-use-this-fund'),
      $fundStrategy = $('.war-fund-strategy'),
      $fundInceptionDate = $('.war-fund-inception-date'),
      $fundManagers = $('.war-fund-managers'),
      $fundManagersSection = $('.war-managers-wrap'),
      $fundFactsheets = $('.war-fund-factsheets'),
      $acceptBtn = $('.accept-btn'),
      // END: Data display holders;
      isMobileScreen = false,
      isTabletScreen = false,
      isDesktopScreen = false,
      initFundsSlider = function(){
        $fundsSliderObject = $fundsSlider.slick({
          infinite: false,
          slidesToShow: 6,
          variableWidth: true,
          swipeToSlide: true,
          prevArrow: '<i class="fas fa-arrow-left slick-prev"></i>',
          nextArrow: '<i class="fas fa-arrow-right slick-next"></i>',
          dots: false,
          responsive: [
            {
              breakpoint: 1694,
              settings: {
                variableWidth: false,
                slidesToShow: 5
              }
            },
            {
              breakpoint: 1440,
              settings: {
                variableWidth: false,
                slidesToShow: 4
              }
            },
            {
              breakpoint: 992,
              settings: {
                variableWidth: false,
                slidesToShow: 3
              }
            },
            {
              breakpoint: 768,
              settings: {
                variableWidth: false,
                slidesToShow: 2
              }
            },
            {
              breakpoint: 576,
              settings: {
                variableWidth: false,
                slidesToShow: 1
              }
            }
          ]
        });

        $fundsSliderObject.on('afterChange', function () {
          slideBackwards = false;
        });

        $fundsSliderObject.on('breakpoint', function () {
          initFundButtons();
        });
      },
      deselectFunds = function(){
        $fundContainer.addClass('inactive');
        $fundButton.removeClass('active');
        $fundName.html('');
        $fundPhilosophy.html('');
        $fundHighlights.html('');
        $fundWhyUseThisFund.html('');
        $fundWhyUseThisFundTitle.html('');
        $fundStrategy.html('');
        $fundInceptionDate.html('');
        $fundManagersSection.html('');
        $fundFactsheets.html('');
      },
      initFundButtons = function() {
        $fundButton.click(function(){
          $fundButton.removeClass('active');
          $(this).addClass('active');
          var fundIndex = $(this).data('index');
          var fundData = fundsData[fundIndex];

          history.pushState({}, '', baseUrl + 'fund/' + fundData.slug + '/');

          calcButtonsByCategories(fundData.categories[0]);
          selectCategoryByName(fundData.categories[0]);

          $fundName.html(fundData.name);
          $fundPhilosophy.html(fundData.philosophy);
          $fundHighlights.html(fundData.highlights);
          $fundWhyUseThisFundTitle.html(fundData.why_use_invest.title);
          $fundWhyUseThisFund.html(fundData.why_use_invest.text);
          $fundStrategy.html(fundData.strategy);
          $fundInceptionDate.html(fundData.inception_date);
          $fundManagersSection.html($(fundData.managersHTML).find('.row'));
          $fundFactsheets.html(fundData.factsheetsHTML);
          $fundContainer.removeClass('inactive');
        });
      },
      calcButtonsBySlider = function(sMin, sMax) {
        $fundButton.addClass('disabled');
        $fundButton.filter(function(i, e) {
          var $e = $(e);
          var bMin = $e.data('min');
          var bMax = $e.data('max');
          return (sMin <= bMin && bMax <= sMax );
        }).removeClass('disabled');
      },
      calcButtonsByCategories = function(category, scrollToFirst) {
        scrollToFirst = scrollToFirst ? scrollToFirst : false;
        $fundButton.addClass('disabled');
        var $categoryButtons = $fundButton.filter(function(i, e) {
          var $e = $(e);
          var bCategories = $e.data('categories');
          return bCategories.indexOf(category) !== -1;
        });
        $categoryButtons.removeClass('disabled');

        if (scrollToFirst) {
          var firstButtonIndex = $categoryButtons.first().data('index');
  
          slideBackwards = true;
          calcActiveSlide(firstButtonIndex);
        }
      },
      calcSliderByCategory = function($e) {
        var cMin = $e.data('min');
        var cMax = $e.data('max');
        $strategiesSliderRange.slider( "values", 0, cMin );
        $strategiesSliderRange.slider( "values", 1, cMax );
      },
      calcCategoriesBySlider = function(sMin, sMax) {
        $fundCategory.removeClass('active');
        $fundCategory.filter(function(i, e) {
          var $e = $(e);
          var bMin = $e.data('min');
          var bMax = $e.data('max');
          return (sMin <= bMin && bMax <= sMax );
        }).addClass('active');
      },
      calcActiveSlide = function(firstButtonIndex) {
        setTimeout(function() {
          while(slideBackwards && firstButtonIndex >= 0) {
            $fundsSlider.slick('slickGoTo', firstButtonIndex);
            firstButtonIndex--;
            calcActiveSlide(firstButtonIndex);
          }
        }, 200);
      },
      selectCategoryByName = function(category){
        $fundCategory.removeClass('active');
        var $newCategory = $('.war-fund-category[data-category="'+category+'"]');
        $newCategory.addClass('active');
      },
      selectCategoryBySlug = function(category){
        $fundCategory.removeClass('active');
        var $newCategory = $('.war-fund-category[data-category-slug="'+category+'"]');
        $newCategory.addClass('active');
        calcButtonsByCategories($newCategory.attr('data-category'), true);
        calcSliderByCategory($newCategory);
      },
      selectButton = function(fund) {
        var $newFund = $('.war-fund-button[data-fund-slug="'+fund+'"]');

        slideBackwards = true;
        calcActiveSlide($newFund.data('index'));
      };


  helperModule.media('screen and (max-width: 767px)', function(){
      isMobileScreen = true;
  });

  helperModule.media('screen and (min-width: 768px) and (max-width: 1199px)', function(){
      isTabletScreen = true;
  });

  helperModule.media('screen and (min-width: 1200px)', function(){
      isDesktopScreen = true;
  });


  $strategiesPrivate.click(function(){
    $strategiesSelect.hide();
    $licenceAgreementPrivate.fadeIn();
  })

  $strategiesMutual.click(function(){
    $strategiesSelect.hide();
    $licenceAgreementMutual.fadeIn();
  })

  $fundCategory.click(function(){
    deselectFunds();
    $fundCategory.removeClass('active');
    $(this).addClass('active');

    history.pushState({}, '', baseUrl + 'private/' + $(this).data('category-slug') + '/');

    calcButtonsByCategories($(this).data('category'), true);
    calcSliderByCategory($(this));

  })

  $acceptBtn.click(function(e){
    var fund = $(this).attr('data-funds');
    e.preventDefault();

    var data = {
      action: 'war_update_cookie',
      war_fund: fund
    };

    $.ajax({
      type: 'post',
      url: war_settings.ajax_url,
      data: data,
      success: function(data) {
        data = JSON.parse(data);
        if (data.message !== 'Success') {
          return false;
        } else {
          if(data.url){
            window.location.href = data.url;
          }else{
            window.location.reload();
          };
        }
      }
    });
  })

  $strategiesSliderRange.slider({
    range: true,
    min: 0,
    max: 100,
    values: [ 0, 100 ],
    slide: function( event, ui ) {
      calcButtonsBySlider(ui.values[ 0 ], ui.values[ 1 ]);
      calcCategoriesBySlider(ui.values[ 0 ], ui.values[ 1 ]);
    }
  });

  if($fundsSlider.length){
    initFundsSlider();
  }

  if($fundButton.length){
    initFundButtons();
  }

  // Init state
  // if($fundCategory.length && $strategiesSliderRange.length && $fundButton.length){ // code when fund slider is present 'strategiesSliderRange'
  if($fundCategory.length && $fundButton.length) {

    if( selectedFundSlug && selectedFundSlug[0]!=='' ){
      smoothScrollModule.scrollToElement($('.strategies-bottom'), 1000, 250)
      // Moj komit
      selectButton(selectedFundSlug);
    }else{
      deselectFunds();
    }

    if( selectedStrategySlug && selectedStrategySlug[0]!=='' ){
      selectCategoryBySlug(selectedStrategySlug);

      if (isMobileScreen) {
        var $category = $('.war-fund-category[data-category-slug="'+selectedStrategySlug+'"]');
        smoothScrollModule.scrollToElement($category, 1000, 130);
      }
      if (isTabletScreen || isDesktopScreen) {
        smoothScrollModule.scrollToElement($('.strategies-middle'), 1000, 150);
      }
    }else{
      var $currentCategory = $fundCategory.filter('.active');
      calcButtonsByCategories($currentCategory.data('category'), true);
      calcSliderByCategory($currentCategory);
    }
    
    // When it is just /strategies/
    if( selectedFundSlug[0]=='' && selectedStrategySlug[0]=='' && isMobileScreen ) {
      smoothScrollModule.scrollToElement($('section#strategies'), 1000, 50)
    }
  }


})(jQuery);