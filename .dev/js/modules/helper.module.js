var helperModule = (function($){

    var $warArticles =  $('.simpact-wrapper .war-articles'),
    
    media = function(expression, matchCallback, mismatchCallback){
        if (matchMedia) {
            var mediaQuery = window.matchMedia(expression);
            mediaQuery.addListener(widthChange);
            widthChange(mediaQuery);
        }
    
        function widthChange(mediaQuery) {
            if (mediaQuery.matches){
                matchCallback();
            }else{
                (typeof mismatchCallback !== 'undefined') && mismatchCallback();
            }
        }
    },

    chunk = function(obj, size){
        
        // var values = Object.values(obj); fix for IE

        var values = Object.keys(obj).map(function(e) {
            return obj[e]
        });
        var final = [];
        var counter = 0;
        var portion = {};
        
        for (var key in obj) {
          if (counter !== 0 && counter % size === 0) {
            final.push(portion);
            portion = {};
          }
          portion[key] = values[counter];
          counter++
        }
        final.push(portion);
        
        return final
    },
    isTouch = 'ontouchstart' in document.documentElement
        || (navigator.MaxTouchPoints > 0)
        || (navigator.msMaxTouchPoints > 0),

    checkArticleHeights = function(){
                // Cache the highest   
                var highestBox = 0;
                var highestTitle = 0;

                $warArticles.each( function(index, element){
                var paragraph = $(element).find('p');
                var title = $(element).find('h4');

                paragraph.css('height', 'auto');
                title.css('height', 'auto');
                
                // If this box is higher than the cached highest then store it
                if(paragraph.height() > highestBox) {
                    highestBox = paragraph.height(); 
                }
                if(title.height() > highestTitle) {
                    highestTitle = title.height(); 
                }
                
                });  
                        
                // Set the height of all those children to whichever was highest 
                $warArticles.find('p').height(highestBox);
                $warArticles.find('h4').height(highestTitle);
                                
        };
    
    if (isTouch) { // remove all :hover stylesheets
        try { // prevent exception on browsers not supporting DOM styleSheets properly
            for (var si in document.styleSheets) {
                var styleSheet = document.styleSheets[si];
                if (!styleSheet.rules) continue;
    
                for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                    if (!styleSheet.rules[ri].selectorText) continue;
    
                    if (styleSheet.rules[ri].selectorText.match(':hover')) {
                        styleSheet.deleteRule(ri);
                    }
                }
            }
        } catch (ex) {}
    }

    if($warArticles.length>0){

        checkArticleHeights();

        $(window).resize(function() {
            clearTimeout(window.homeResizedFinished);
            window.homeResizedFinished = setTimeout(function(){
                checkArticleHeights();
            }, 250);
        });
    }

    return {
        media: media,
        isTouch: isTouch,
        chunk: chunk,
        checkArticleHeights: checkArticleHeights
    }

})(jQuery);