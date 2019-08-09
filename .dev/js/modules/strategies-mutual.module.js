var strategiesMutualModule = (function($){
	var $managerLb = $('.manager-lb'),
	$lbContent = $('.manager-lightbox'),
	lbShown = false,
	$body = $('body'),
	$managersSection = $('.war-managers-wrap, .war-fund-managers-section'),
	showManagerLb = function(targetMarkup){
		if(!lbShown ){
			var clone = targetMarkup.clone();
			clone = $(clone).css('display', 'block');
			lbShown  = true;
			$.featherlight(clone, {
				variant: 'war-manager-lightbox',
				afterOpen: strategiesMutualModule.beforeLightboxClose,
				afterClose: strategiesMutualModule.afterLightBoxClose
			});
		}
	},

	beforeLightboxClose = function(){
		$body.addClass('war-pointer-none')
	},

	afterLightBoxClose = function(){
		lbShown = false;
		setTimeout(function(){
			$body.removeClass('war-pointer-none ');
		},500);
	};

	$managersSection.on( 'click', '.manager-lb', function(){
		var id = $(this).attr('data-id');
		var $lbContent = $('.manager-lightbox[data-manager-id="'+id+'"]');
		showManagerLb($lbContent);
	});

	return {
		beforeLightboxClose : beforeLightboxClose,
		afterLightBoxClose : afterLightBoxClose,
		lbShown: lbShown
	}
})(jQuery);
