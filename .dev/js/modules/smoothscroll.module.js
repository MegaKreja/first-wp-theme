var smoothScrollModule = (function($){

  var scrollToElement = function( $elementRef, transitionTime, offset){
    
    offset = offset || 0;

    // Does a scroll target exist?
    if ($elementRef.length) {
      // Only prevent default if animation is actually gonna happen
      //event.preventDefault();
      
      $('html, body').animate({
        scrollTop: $elementRef.offset().top - offset
      }, transitionTime, function() {

        // Commented out for now, since Chrome scrolls to this element after the animation, which seems broken

        // Callback after animation
        // Must change focus!

        // $elementRef.focus();
        // if ($elementRef.is(":focus")) { // Checking if the target was focused
        //   return false;
        // } else {
        //   $elementRef.attr('tabindex','-1'); // Adding tabindex for elements not focusable
        //   $elementRef.focus(); // Set focus again
        // };
      });
    }
  }

// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var hash = $(this).attr('href');

      if(hash=='#' || hash=='' || !hash){
        event.preventDefault();
        return false;
      }

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        scrollToElement(target, 1000, 100);
        $('.mouse-in').removeClass('mouse-in');
      }

    }
});

return {
  scrollToElement: scrollToElement
};


})(jQuery);