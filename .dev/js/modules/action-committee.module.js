var actionCommitteeModule = (function($){
	
	var $thumb = $('.war-articles_video-play'),
	
	showLightBox = function(targetMarkup){
		var iframe = targetMarkup.find('iframe');
		var origSrc = iframe.attr('src');
		iframe.attr('src', origSrc+'&autoplay=1');

		setTimeout(function(){
			$.featherlight(targetMarkup, {
				variant: 'war-article-lightbox'
			});
		},100);
	},
	
	bindThumbnailClick = function(){
		$thumb.on('click', function(){
			var thumb = $(this);
			var target = thumb.parent().find('.war-articles_video').clone();
			showLightBox(target);
		});
	};

	bindThumbnailClick();
	
	return {
		bindThumbnailClick : bindThumbnailClick
	}

})(jQuery);