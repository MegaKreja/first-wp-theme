var navModule = (function($){
		var $body = $('body'),
		$menuBtn = $('.menu-toggle-btn'),
		$menuWrap = $('.menu-main-menu-container'),
		$menuLink = $('.menu-item a'),
		menuShown = false,

		open = function(){
			if(!menuShown){
				$menuWrap.addClass('menu-open');
				$body.addClass('mobile-nav-open');
				menuShown = true;
				$menuBtn.addClass('close');
				
				setTimeout(function(){
					$menuWrap.find('.menu-close').addClass('active');
				},500);
				
				$('.menu-close').on('click', function(){
					close();
				});
			}
		},

		close = function(){
			if(menuShown){
				$body.removeClass('mobile-nav-open');
				$menuWrap.removeClass('menu-open');
				$menuBtn.removeClass('close');
				menuShown = false;
			}
		};

		$menuBtn.on('click', function(){
			if(menuShown){
				close();
			}else{
				open();
			}
		});

		$menuLink.on('click', function(){
			if(menuShown){
				close();
			}
		});

		helperModule.media('screen and (min-width: 1024px)', function(){
			close();
		});

		$('.menu-item-has-children').hover(function(){
			$(this).addClass('mouse-in');
		},function(){
			$(this).removeClass('mouse-in');
		});

		$('.menu-item-has-children').on('touchend', function(e){
			if( !$(this).hasClass('.mouse-in') ){
				$(this).addClass('mouse-in');
			}
		});


		//prevent default on touch devices parent menu first click. Only on desktop menu with dropdowns
		$('#primary-menu > .menu-item-has-children > a').click(function(e){
			var $link = $(this);
			if(!helperModule.isTouch){
				return true;
			}
			if ($link.hasClass('clicked')){
				return true;
			}else{
				$link.addClass('clicked');
				e.preventDefault();
			}
		});

    return {
		open: open,
		close: close
    }
})(jQuery);